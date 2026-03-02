"use client"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { ScrambledText } from "@/components/ui/modern-animated-hero-section";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroGradientSamplePage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Navigation back to main */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 flex justify-between items-center">
                <div className="font-bold text-lg text-slate-800">
                    M-PREP Animated Gradient Sample
                </div>
                <Link href="/" className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm">
                    메인으로 돌아가기
                </Link>
            </nav>

            <div className="pt-20 text-center py-6 bg-slate-100/50">
                <h1 className="text-2xl font-bold text-slate-700">Animated Gradient Hero 프리뷰</h1>
                <p className="text-slate-500 mt-2">제공된 소스를 바탕으로 메인 페이지의 헤드레터를 입혔습니다.</p>
            </div>

            <section className="relative w-full h-[80vh] overflow-hidden bg-slate-50 flex items-center justify-center">
                {/* Animated Gradient Background */}
                <AnimatedGradientBackground className="pointer-events-none" />

                {/* Overlay content */}
                <div className="relative z-10 flex flex-col items-center text-center p-4 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/40 backdrop-blur-sm p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-white/50"
                    >
                        <h1 className="text-center font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-trust-navy to-slate-600 mb-4 drop-shadow-sm leading-tight flex flex-col items-center gap-4">
                            <span className="block text-2xl sm:text-3xl text-rose-600 mb-6 font-bold tracking-widest uppercase">AI 시대, 한·수·위 전략</span>

                            {/* PREP (Green) */}
                            <span className="block text-6xl sm:text-[100px] leading-none mb-6 text-emerald-600 drop-shadow-md">
                                PREP
                            </span>

                            {/* Scrambled Text + M-PREP (Purple) */}
                            <span className="flex items-center justify-center gap-3 text-5xl sm:text-[80px] leading-none mt-2">
                                <span className="text-2xl sm:text-4xl text-slate-500 font-medium tracking-widest uppercase bg-white/60 px-5 py-3 rounded-2xl shadow-inner border border-white/80 backdrop-blur-md">
                                    <ScrambledText phrases={["치트키", "마스터키", "프롬프트", "사고구조"]} />
                                </span>
                                <span className="text-violet-600 drop-shadow-md tracking-tight">M-PREP</span>
                            </span>
                        </h1>

                        <div className="mt-12 flex justify-center gap-4">
                            <button className="px-8 py-3 rounded-full bg-trust-navy text-white font-bold hover:bg-slate-800 transition-colors shadow-lg active:scale-95 flex items-center gap-2">
                                시작하기 <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Original Demo (Variant1) for reference */}
            <section className="relative w-full h-[80vh] overflow-hidden bg-black flex items-center justify-center border-t border-slate-800">
                <AnimatedGradientBackground />
                <div className="relative z-10 flex flex-col items-center p-4">
                    <h2 className="text-white text-4xl font-bold mb-4">Original Demo Variant</h2>
                    <p className="text-gray-300 text-lg max-w-lg text-center">
                        A customizable animated radial gradient background with a subtle breathing effect.
                    </p>
                </div>
            </section>

        </div>
    );
}
