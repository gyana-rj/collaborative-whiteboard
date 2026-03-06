import React from "react";

export interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function Card({ title, description, icon }: CardProps) {
  return (
    <div className="flex flex-col items-start">
      <div className="h-10 w-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center mb-4 shadow-sm">
        {icon}
      </div>
      <h3 className="text-lg font-medium tracking-tight text-zinc-900 mb-2">{title}</h3>
      <p className="text-sm font-normal text-zinc-500 leading-relaxed">{description}</p>
    </div>
  );
}
