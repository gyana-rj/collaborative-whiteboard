import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { ArrowRight, Circle, Eraser, Pencil, RectangleHorizontalIcon, Trash, Type } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "rect" | "pencil" | "eraser" | "text" | "arrow";

export function Canvas({roomId, socket}: {roomId: number; socket : WebSocket} ){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>("circle");
    const [game, setGame] = useState<Game>();

    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game])

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
            overflow: "hidden"

    }}>
        <canvas style={{display : "block"}} ref ={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} game={game}/>

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
                Room: {roomId}
            </div>
        </div>
}

function Topbar({selectedTool, setSelectedTool, game}: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
    game?: Game 
}){
    return <div style={{
            position: "fixed",
            top: 10,
            left: 10
        }}>
          <div className="flex gap-2">
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

           <div className="w-px bg-zinc-700 mx-1"></div>

           <IconButton onClick={() => {
            game?.clearAll()
           }} activated = {false} icon = {<Trash className="text-red-500"/>}/>

          </div>
    </div>
}