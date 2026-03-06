"use client";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline"; 
  onClick?: () => void;
}

export function Button({ children, onClick, variant = "primary", className, ...props }: ButtonProps) {
  const baseStyles = "text-sm sm:text-base font-medium px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-colors shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto";
  
  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800 disabled:bg-zinc-400",
    outline: "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 disabled:bg-zinc-100 disabled:text-zinc-400"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className || ""}`} {...props}>
      {children}
    </button>
  );
}