"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script"; // <-- Added Next.js Script component
import { 
  Pencil, Database, Server, Monitor, Users, Lock, 
  Download, Keyboard, FileText, ZapOff, X 
} from 'lucide-react';
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: <Users className="w-5 h-5 text-zinc-800" />,
      title: "Multiplayer collaboration",
      description: "Work together with your team in real-time. See cursors move, changes appear instantly, and brainstorm synchronously without friction."
    },
    {
      icon: <ZapOff className="w-5 h-5 text-zinc-800" />,
      title: "Infinite canvas",
      description: "Never run out of space. Pan, zoom, and expand your canvas in any direction to accommodate even the most complex architectures."
    },
    {
      icon: <Pencil className="w-5 h-5 text-zinc-800" />,
      title: "Hand-drawn aesthetic",
      description: "Keep ideas feeling malleable. The sketchy style reduces the pressure of creating \"perfect\" diagrams early in the process."
    },
    {
      icon: <Lock className="w-5 h-5 text-zinc-800" />,
      title: "End-to-end encryption",
      description: "Your data remains yours. Whiteboards are encrypted so even we cannot read the contents of your private drawings."
    },
    {
      icon: <Download className="w-5 h-5 text-zinc-800" />,
      title: "Export anywhere",
      description: "Easily export your boards as high-resolution PNG, SVG, or share a read-only link with stakeholders outside your organization."
    },
    {
      icon: <Keyboard className="w-5 h-5 text-zinc-800" />,
      title: "Keyboard first",
      description: "Navigate, draw, and organize entirely without taking your hands off the keyboard. Designed for speed and power users."
    }
  ];

  return (
    <>
      {/* THIS IS THE MAGIC LINE: It loads Tailwind directly without a config file! */}
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />

      <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 antialiased selection:bg-zinc-200 selection:text-zinc-900 font-sans">
        {/* Custom Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .dot-pattern {
              background-image: radial-gradient(#d4d4d8 1px, transparent 1px);
              background-size: 24px 24px;
            }
            .sketch-border {
              border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
            }
          `
        }} />

        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-zinc-200/50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-semibold tracking-tighter text-zinc-900">
                CLWB
              </Link>

            </div>

            <div className="flex items-center gap-4">
              <Link href="/signin" className="hidden md:block text-sm font-normal text-zinc-600 hover:text-zinc-900 transition-colors">Log in</Link>
              <Button variant="primary" onClick={() => router.push("/dashboard")}>
                Open workspace
              </Button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center w-full">

          {/* Hero Section */}
          <section className="w-full max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">
            <Link href="#" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-medium text-zinc-600 mb-8 hover:bg-zinc-200/50 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              Will add new features soon.
              <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 max-w-4xl leading-[1.1]">
              Think, sketch, and collaborate <span className="text-zinc-400">in real-time.</span>
            </h1>

            <p className="mt-6 text-lg font-normal text-zinc-500 max-w-2xl leading-relaxed">
              The virtual whiteboard that feels like drawing on paper. Wireframe ideas, map out architectures, and brainstorm with your team effortlessly.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link href={"/signin"}>
              <Button variant="primary">
                <Pencil className="w-5 h-5" />
                Sign In
              </Button>
              </Link>
              <Link href={"/signup"}>
              <Button variant="outline">
                <FileText className="w-5 h-5" />
                Sign up - it's free
              </Button>
              </Link>
            </div>
          </section>

          {/* Product Mockup Section */}
          <section className="w-full max-w-6xl mx-auto px-6 mb-32">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-white rounded-2xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex items-center justify-center dot-pattern">

              <div className="absolute top-0 left-0 right-0 h-12 border-b border-zinc-200/50 bg-white/90 backdrop-blur flex items-center justify-between px-4 z-10">
                <div className="flex items-center gap-3">
                  <Pencil className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-700 tracking-tight">Project Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="h-6 w-6 rounded-full bg-zinc-200 border-2 border-white flex items-center justify-center text-xs font-medium text-zinc-600">A</div>
                    <div className="h-6 w-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-xs font-medium text-indigo-600">J</div>
                  </div>
                  <div className="h-6 px-2 rounded bg-indigo-50 text-indigo-600 text-xs font-medium flex items-center border border-indigo-100">Share</div>
                </div>
              </div>

              <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white border border-zinc-200 shadow-sm rounded-lg p-1.5 flex items-center gap-1 z-10">
                <div className="p-1.5 rounded hover:bg-zinc-100 text-zinc-400 cursor-pointer flex items-center justify-center"><ZapOff className="w-4 h-4" /></div>
                <div className="p-1.5 rounded hover:bg-zinc-100 text-zinc-400 cursor-pointer flex items-center justify-center"><Users className="w-4 h-4" /></div>
                <div className="w-px h-4 bg-zinc-200 mx-1"></div>
                <div className="p-1.5 rounded bg-indigo-50 text-indigo-600 cursor-pointer flex items-center justify-center"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" /></svg></div>
                <div className="p-1.5 rounded hover:bg-zinc-100 text-zinc-400 cursor-pointer flex items-center justify-center"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" /></svg></div>
                <div className="p-1.5 rounded hover:bg-zinc-100 text-zinc-400 cursor-pointer flex items-center justify-center"><Pencil className="w-4 h-4" /></div>
                <div className="p-1.5 rounded hover:bg-zinc-100 text-zinc-400 cursor-pointer flex items-center justify-center"><FileText className="w-4 h-4" /></div>
                <div className="p-1.5 rounded hover:bg-zinc-100 text-zinc-400 cursor-pointer flex items-center justify-center"><X className="w-4 h-4" /></div>
              </div>

              <div className="relative w-full h-full flex items-center justify-center pt-10">
                <div className="absolute -translate-x-40 -translate-y-12 rotate-2">
                  <div className="w-32 h-20 bg-white border-2 border-zinc-800 sketch-border flex flex-col items-center justify-center shadow-sm">
                    <Database className="w-5 h-5 text-zinc-800 mb-1" />
                    <span className="text-xs font-medium tracking-tight text-zinc-800">Database</span>
                  </div>
                </div>

                <svg className="absolute -translate-x-12 -translate-y-8" width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 10C20 10 40 10 58 10" stroke="#27272a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M50 2L58 10L50 18" stroke="#27272a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <div className="absolute translate-x-16 -translate-y-4 -rotate-1">
                  <div className="w-32 h-20 bg-indigo-50 border-2 border-indigo-600 sketch-border flex flex-col items-center justify-center shadow-sm relative">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-indigo-600 border border-white"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-600 border border-white"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-600 border border-white"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-indigo-600 border border-white"></div>
                    <Server className="w-5 h-5 text-indigo-600 mb-1" />
                    <span className="text-xs font-medium tracking-tight text-indigo-600">API Server</span>
                  </div>
                  <div className="absolute -bottom-4 -right-4 flex items-start">
                    <Pencil className="w-5 h-5 text-zinc-900 drop-shadow-md" />
                    <span className="bg-zinc-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap -ml-1 mt-3">Jane D.</span>
                  </div>
                </div>

                <svg className="absolute translate-x-12 translate-y-16" width="20" height="60" viewBox="0 0 20 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C10 20 10 40 10 58" stroke="#27272a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"/>
                  <path d="M2 50L10 58L18 50" stroke="#27272a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <div className="absolute translate-x-12 translate-y-36 rotate-1">
                  <div className="w-32 h-20 bg-white border-2 border-zinc-800 sketch-border flex flex-col items-center justify-center shadow-sm">
                    <Monitor className="w-5 h-5 text-zinc-800 mb-1" />
                    <span className="text-xs font-medium tracking-tight text-zinc-800">Client Web</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex absolute top-16 right-4 w-48 bg-white border border-zinc-200 shadow-sm rounded-lg flex-col z-10">
                <div className="p-3 border-b border-zinc-100">
                  <span className="text-xs font-medium text-zinc-900 tracking-tight">Stroke</span>
                  <div className="flex gap-2 mt-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-white ring-1 ring-zinc-200 cursor-pointer"></div>
                    <div className="w-6 h-6 rounded-full bg-indigo-600 border-2 border-white cursor-pointer"></div>
                    <div className="w-6 h-6 rounded-full bg-rose-500 border-2 border-white cursor-pointer"></div>
                    <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-white cursor-pointer"></div>
                  </div>
                </div>
                <div className="p-3 border-b border-zinc-100">
                  <span className="text-xs font-medium text-zinc-900 tracking-tight mb-2 block">Background</span>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="w-full aspect-square rounded bg-transparent border border-zinc-200 flex items-center justify-center relative overflow-hidden cursor-pointer">
                      <div className="w-[150%] h-[1px] bg-red-500 rotate-45 absolute"></div>
                    </div>
                    <div className="w-full aspect-square rounded bg-indigo-50 border border-zinc-200 cursor-pointer"></div>
                    <div className="w-full aspect-square rounded bg-rose-50 border border-zinc-200 cursor-pointer"></div>
                    <div className="w-full aspect-square rounded bg-amber-50 border border-zinc-200 cursor-pointer"></div>
                  </div>
                </div>
                <div className="p-3">
                  <span className="text-xs font-medium text-zinc-900 tracking-tight mb-2 block">Edges</span>
                  <div className="flex bg-zinc-100 rounded p-0.5">
                    <div className="flex-1 py-1 flex justify-center bg-white rounded shadow-sm text-zinc-900 cursor-pointer"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" /></svg></div>
                    <div className="flex-1 py-1 flex justify-center text-zinc-400 hover:text-zinc-600 cursor-pointer"><Pencil className="w-4 h-4" /></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid Section */}
          <section className="w-full max-w-7xl mx-auto px-6 mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">Everything you need to map your thoughts</h2>
              <p className="mt-3 text-sm font-normal text-zinc-500 max-w-xl mx-auto">A minimalist toolset designed to stay out of your way so you can focus on what matters: the ideas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full border-t border-zinc-200/60 bg-white">
            <div className="max-w-4xl mx-auto px-6 py-24 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-xl bg-zinc-900 flex items-center justify-center mb-6 shadow-md">
                <Pencil className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 mb-4">Ready to start sketching?</h2>
              <p className="text-base font-normal text-zinc-500 mb-8 max-w-lg">
                Join thousands of teams who use Canvas to brainstorm, build, and document their ideas every day. No signup required to start.
              </p>
              <Button variant="primary" onClick={() => router.push("/board")}>
                Open a new canvas
              </Button>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-200/60 bg-[#FAFAFA] py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tighter text-zinc-900">CLWB</span>
              <span className="text-xs text-zinc-400 ml-2">© 2026 Canvas Inc.</span>
            </div>

            <div className="flex gap-6">
              <Link href="#" className="text-xs font-normal text-zinc-500 hover:text-zinc-900 transition-colors">Twitter</Link>
              <Link href="#" className="text-xs font-normal text-zinc-500 hover:text-zinc-900 transition-colors">GitHub</Link>
              <Link href="#" className="text-xs font-normal text-zinc-500 hover:text-zinc-900 transition-colors">Discord</Link>
              <Link href="#" className="text-xs font-normal text-zinc-500 hover:text-zinc-900 transition-colors">Privacy</Link>
              <Link href="#" className="text-xs font-normal text-zinc-500 hover:text-zinc-900 transition-colors">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}