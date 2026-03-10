"use client"
import Link from "next/link";
import { Pencil } from "lucide-react";
import Script from "next/script"; 
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateUserSchema, SignInSchema } from "@repo/common"; 
import { HTTP_BACKEND } from "@/config";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{name?: string, email?: string, password?: string}>({});

    const handleSubmit = async () => {
        setErrors({});

        const schema = isSignin ? SignInSchema : CreateUserSchema;

        const validation = schema.safeParse({
            username: email,
            password,
            ...(isSignin ? {} : {name})
        });

        if(!validation.success){
            const formattedErrors: any = {};
            validation.error.issues.forEach((issue) => {
                const field = issue.path[0] === 'username' ? 'email' : issue.path[0];
                formattedErrors[field] = issue.message;
            })
            setErrors(formattedErrors);
            return;
        }

        setLoading(true);
        const endpoint = isSignin ? "signin" : "signup";

        const payload = validation.data;

        try {
            const response = await axios.post(`${HTTP_BACKEND}/${endpoint}`, payload);
            const data = response.data;

            if (data.token) {
                localStorage.setItem("token", data.token);
                router.push("/dashboard");
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Authentication failed";
            alert(errorMessage);
            console.log("Failed to connect the backend", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
            
            <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-zinc-200 px-4">
                
                <Link href="/" className="mb-8 flex items-center gap-2 text-2xl font-semibold tracking-tighter text-zinc-900 hover:opacity-80 transition-opacity">
                    <div className="h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center shadow-md">
                        <Pencil className="w-4 h-4 text-white" />
                    </div>
                    CNVS
                </Link>

                <div className="w-full max-w-md p-8 bg-white rounded-2xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                   
                    <div className="flex flex-col space-y-2 text-center mb-8">
                        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
                            {isSignin ? "Welcome back" : "Create an account"}
                        </h1>
                        <p className="text-sm font-normal text-zinc-500">
                            {isSignin 
                                ? "Enter your details to sign in to your workspace" 
                                : "Enter your details to start sketching for free"}
                        </p>
                    </div>

                    <div className="space-y-4">
                        
                        {!isSignin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 block">Name</label>
                                <input
                                    type="text"
                                    placeholder="Jack Ryan"
                                    value={name}
                                    onChange={(e) => {setName(e.target.value)}}
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 block">Email</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 block">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                            />
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                        </div>

                        <button 
                            disabled={loading}
                            onClick={handleSubmit}
                            className={`w-full mt-8 text-white text-base font-medium px-6 py-3 rounded-full transition-colors shadow-sm flex items-center justify-center gap-2 ${
                                loading 
                                ? "bg-zinc-600 cursor-not-allowed" 
                                : "bg-zinc-900 hover:bg-zinc-800"
                            }`}
                        >
                            {loading ? "Please wait..." : (isSignin ? "Sign in" : "Sign up")}
                        </button>
                    </div>

                    <div className="mt-8 text-center text-sm font-normal text-zinc-500">
                        {isSignin ? "Don't have an account? " : "Already have an account? "}
                        <Link 
                            href={isSignin ? "/signup" : "/signin"} 
                            className="font-medium text-zinc-900 hover:underline"
                        >
                            {isSignin ? "Sign up" : "Sign in"}
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
}