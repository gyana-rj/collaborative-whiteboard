import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { ArrowRight, Circle, Eraser, Home, Icon, Pencil, RectangleHorizontalIcon, Trash, Type } from "lucide-react";
import { Game } from "@/draw/Game";
import { useRouter } from "next/navigation";

export type Tool = "circle" | "rect" | "pencil" | "eraser" | "text" | "arrow";

export function Canvas({roomId, socket, roomSlug}: {roomId: number; socket : WebSocket; roomSlug : string}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>("circle");
    const [selectedColor, setSelectedColor] = useState<string>("#ffffff");
    const [game, setGame] = useState<Game>();
    const router = useRouter();
    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game])

    useEffect(() => {
        game?.setColor(selectedColor)
    }, [selectedColor, game]);

    useEffect(() => {
        if(canvasRef.current){
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);
            return () => {
                g.destroy();
            }
        }
    }, [canvasRef, roomId, socket]);

    return <div style={{
            height: "100vh",
            width: "100vw",
            overflow: "auto"

    }}>
        <canvas style={{display : "block"}} ref ={canvasRef} width={5000} height={5000}></canvas>
        <Topbar selectedTool={selectedTool} 
        setSelectedTool={setSelectedTool} 
        selectedColor = {selectedColor}
        setSelectedColor = {setSelectedColor}
        game={game} 
        onExit={() => router.push("/dashboard")}/>

        <div 
                style={{
                    position: "fixed",
                    top: 10,
                    right: 10
                }} 
                className="bg-zinc-900 border border-zinc-700 text-zinc-300 px-4 py-2 rounded-full text-sm font-medium shadow-md flex items-center gap-2"
            >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Room: {roomSlug}
            </div>
        </div>
}

function Topbar({selectedTool, selectedColor, setSelectedColor, setSelectedTool, game, onExit}: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void,
    setSelectedColor: (c: string) => void,
    selectedColor: string,
    game?: Game,
    onExit: () => void;
}){
    const strokeColors = ["#ffffff", "#ef4444", "#22c55e", "#3b82f6", "#eab308"];
    return <div style={{
            position: "fixed",
            top: 10,
            left: 10
        }}>
            
          <div className="flex gap-2 items-center bg-zinc-900/80 backdrop-blur-md p-2 rounded-lg border border-zinc-700 shadow-lg">

           <IconButton onClick={onExit} activated = {false} icon = {<Home/>} />
          <div className="w-px h-8 bg-zinc-700 mx-1"></div>

           <IconButton onClick={() => {
            setSelectedTool("pencil")
           }} activated={selectedTool === "pencil"} icon = {<Pencil/>}/> 

           <IconButton onClick={() => {
            setSelectedTool("rect")
           }} activated={selectedTool === "rect"} icon = {<RectangleHorizontalIcon/>}/>

           <IconButton onClick={() => {
            setSelectedTool("circle")
           }} activated={selectedTool === "circle"} icon= {<Circle/>}/>

           <IconButton onClick={() => {
            setSelectedTool("eraser")
           }} activated= {selectedTool === "eraser"} icon = {<Eraser/>}/>

           <IconButton onClick={() => {
            setSelectedTool("text")
           }} activated = {selectedTool === "text"} icon = {<Type/>} />

           <IconButton onClick={() => {
            setSelectedTool("arrow")
           }} activated = {selectedTool === "arrow"} icon = {<ArrowRight/>}/>

           <div className="flex gap-1 px-1">
             {strokeColors.map((color) => (
               <button
                 key={color}
                 onClick={() => setSelectedColor(color)}
                 className={`w-6 h-6 rounded-md transition-all ${
                   selectedColor === color 
                     ? "ring-2 ring-zinc-300 scale-110" 
                     : "border border-zinc-700 hover:scale-110"
                 }`}
                 style={{ backgroundColor: color }}
                 title={`Select color: ${color}`}
               />
             ))}
           </div>

           <div className="w-px h-8 bg-zinc-700 mx-1"></div>

           <IconButton onClick={() => {
            game?.clearAll()
           }} activated = {false} icon = {<Trash className="text-red-500"/>}/>

          </div>
    </div>
}