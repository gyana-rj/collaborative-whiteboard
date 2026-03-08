"use client";
import { WS_BACKEND } from "@/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [numericId, setNumericId] = useState<number | null>(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    let ws: WebSocket | null = null;

    axios.get(`http://localhost:3001/room/${roomId}`).then((res) => {
      if (res.data.room && res.data.room.id) {
        const id = res.data.room.id;
        setNumericId(id);

        ws = new WebSocket(`${WS_BACKEND}?token=${token}`);

        ws.onopen = () => {
          setSocket(ws);
          ws?.send(
            JSON.stringify({
              type: "join_room",
              roomId: id,
            }),
          );
        };
        ws.onclose = () => {
            console.log("WebSocket disconnected");
            setSocket(null);
        };
       }
    })
    .catch((err) => {
        console.error("could not find room", err);
        alert("Room does not exist")
    });

    return () => {
      if(ws){
        ws.close();
      }
    }
  }, [roomId, router]);

  if (!socket) {
    return(
        <div className="h-screen w-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-zinc-400">Syncing with workspace...</p>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Canvas key={numericId} roomId={numericId!} socket={socket} roomSlug= {roomId} />
    </div>
  );
}
