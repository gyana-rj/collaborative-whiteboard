"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardPage() {
  const [joinRoomId, setJoinRoomId] = useState("");
  const router = useRouter();

  const handleJoinRoom = () => {
    if (!joinRoomId.trim()) return;
    router.push(`/canvas/${joinRoomId}`);
  };

  const handleCreateRoom = async () => {

    const randomRoomId = Math.floor(100000 + Math.random() * 900000).toString(); 

    try{
        const token = localStorage.getItem("token");

        await axios.post(
            "http://localhost:3001/room",
            {name: randomRoomId},
            {
                headers:{
                    Authorization: token
                }
            }
        );
        router.push(`/canvas/${randomRoomId}`);
    }catch(error: any){
        const errorMessage = error.response?.data?.message;
        alert(errorMessage)
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col gap-6 p-8 border border-zinc-800 rounded-2xl bg-zinc-950 shadow-2xl w-full max-w-md">
        
        <div className="flex justify-center mb-2">
          <div className="flex items-center gap-2 text-xl font-bold">
            <span className="bg-white text-black px-2 py-1 rounded-md text-sm">CNVS</span>
            Workspace
          </div>
        </div>

        <h2 className="text-xl font-medium text-center text-zinc-200">Where do you want to draw?</h2>

        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm text-zinc-400">Join an existing room</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoinRoom()}
              className="flex-1 p-3 rounded-lg bg-zinc-900 border border-zinc-800 focus:border-white focus:outline-none transition-colors"
            />
            <button
              onClick={handleJoinRoom}
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Join
            </button>
          </div>
        </div>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-zinc-800"></div>
          <span className="flex-shrink-0 mx-4 text-zinc-500 text-sm">or</span>
          <div className="flex-grow border-t border-zinc-800"></div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">Start a fresh canvas</label>
          <button
            onClick={handleCreateRoom}
            className="w-full py-4 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-700 flex justify-center items-center gap-2"
          >
            Create New Room
          </button>
        </div>

      </div>
    </div>
  );
}