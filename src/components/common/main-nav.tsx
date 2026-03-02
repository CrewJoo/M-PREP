"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useHomeStore } from "@/store/use-home-store";
import { Menu, X, Home, BarChart3 } from "lucide-react";
import dynamic from "next/dynamic";

const ProgramGuideModal = dynamic(() => import("@/components/common/program-guide-modal").then(mod => mod.ProgramGuideModal), { ssr: false });
const CoachingModal = dynamic(() => import("@/components/common/coaching-modal").then(mod => mod.CoachingModal), { ssr: false });

export function MainNav() {
    const [showGuide, setShowGuide] = useState(false);
    const [showCoaching, setShowCoaching] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { viewMode, setViewMode } = useHomeStore();

    // Close all modals and menus when the route changes
    useEffect(() => {
        setShowGuide(false);
        setShowCoaching(false);
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Logic: Hide Logo on Main Page (AI/Interview modes) and Subpages (About/Transform),
    // but KEEEP it on '/prep' based on user request ("Except PREP training places").
    const isHome = pathname === '/';
    // const isTrainingPlace = pathname.startsWith('/prep') || pathname.startsWith('/about');

    // If we are on the home page, only show if in intro mode (because other modes have their own header?)
    // Actually, user wants "PREP 생각의 공식" on left when menu items clicked.
    // The menu items lead to subpages.
    const showLogo = (isHome && viewMode === 'intro') || !isHome;

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        goHome();
    };

    const goHome = () => {
        if (isHome) {
            setViewMode('intro');
        } else {
            setViewMode('intro'); // Reset state for when we arrive
            router.push('/');
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <div className="fixed top-6 left-0 z-[9999] w-full p-4 flex justify-center pointer-events-none">
                <nav className="pointer-events-auto w-full max-w-7xl bg-white border border-slate-200 shadow-xl rounded-full px-6 py-4 sm:px-8 sm:py-4 flex justify-between items-center transition-all">
                    {/* Logo - Conditional Visibility */}
                    <div
                        className={`flex flex-col items-start justify-center -space-y-1 cursor-pointer transition-opacity duration-300 flex-shrink-0 group ${showLogo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        onClick={handleLogoClick}
                    >
                        <div className="flex items-center gap-2">
                            {/* New Cosmic Logo */}
                            <span className="text-6xl sm:text-5xl font-black tracking-tighter bg-gradient-to-r from-emerald-500 from-[55%] via-indigo-500 via-[85%] to-violet-600 bg-clip-text text-transparent drop-shadow-sm transition-all duration-300 group-hover:brightness-110 pr-1">
                                PREP
                            </span>
                            <div className="flex items-end gap-0.5 ml-0">
                                {['생', '각', '의', '공', '식'].map((char, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <span className="w-1 h-1 rounded-full bg-violet-500 mb-0.5 shadow-sm shrink-0" />
                                        <span className="text-2xl sm:text-3xl font-bold text-violet-600 tracking-tight group-hover:text-violet-700 transition-colors leading-none">
                                            {char}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <span className="text-[0.6rem] sm:text-[0.7rem] font-bold text-slate-400 tracking-[0.2em] uppercase ml-1 opacity-70 group-hover:opacity-100 transition-opacity mt-1">
                            AI 한·수·위가 되도록 돕는 '프렙베이스캠프'
                        </span>
                    </div>

                    {/* Menu Links */}
                    <div className="hidden lg:flex items-center flex-1 ml-4 lg:ml-6 xl:ml-10">
                        {/* Group 1: Text Links (Left Aligned) */}
                        <div className="flex items-center gap-2 lg:gap-3 xl:gap-4 mr-auto pr-2 lg:pr-4 xl:pr-6">
                            {/* PREP Group */}
                            <div className="relative flex flex-col items-start group mr-0 lg:mr-1 py-4">
                                <span className="px-3 py-1 lg:px-4 lg:py-2 rounded-full text-[11px] lg:text-sm font-bold whitespace-nowrap border border-emerald-300 bg-emerald-50 text-emerald-700 cursor-default leading-none shadow-sm transition-transform group-hover:scale-105">
                                    Cheat Key
                                </span>
                                <div className="absolute top-12 left-0 mt-4 lg:mt-5 py-1.5 lg:py-2 px-6 lg:px-8 bg-white border border-emerald-300 rounded-full flex flex-row items-center gap-6 lg:gap-10 text-xs lg:text-sm font-medium text-slate-600 shadow-xl w-max z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left group-hover:translate-y-0 -translate-y-2 pointer-events-none group-hover:pointer-events-auto">
                                    <Link href="/about/prep" className="text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap flex items-center gap-1.5 lg:gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        PREP이란?
                                    </Link>
                                    <Link href="/prep-word-dancing" className="text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap flex items-center gap-1.5 lg:gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        워드댄싱
                                    </Link>
                                    <Link href="/prep-training" className="text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap flex items-center gap-1.5 lg:gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        스텝 트레이닝
                                    </Link>
                                    <Link href="/prep-transform" className="text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap flex items-center gap-1.5 lg:gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        콩떡찰떡
                                    </Link>
                                    <Link href="/prep-level-check" className="text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap flex items-center gap-1.5 lg:gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                        PREP레벨체크
                                    </Link>
                                </div>
                            </div>

                            {/* Master Key Group */}
                            <div className="relative flex flex-col items-start group mr-0 lg:mr-1 py-4">
                                <span className="px-3 py-1 lg:px-4 lg:py-2 rounded-full text-[11px] lg:text-sm font-bold whitespace-nowrap border border-violet-300 bg-violet-50 text-violet-700 cursor-default leading-none shadow-sm transition-transform group-hover:scale-105">
                                    Master Key
                                </span>
                                <div className="absolute top-12 left-0 mt-4 lg:mt-5 py-1.5 lg:py-2 px-6 lg:px-8 bg-white border border-violet-300 rounded-full flex flex-row items-center gap-6 lg:gap-10 text-xs lg:text-sm font-medium text-slate-600 shadow-xl w-max z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left group-hover:translate-y-0 -translate-y-2 pointer-events-none group-hover:pointer-events-auto">
                                    <Link href="/m-prep-intro" className="text-violet-600 hover:text-violet-700 transition-colors whitespace-nowrap flex items-center gap-1.5 lg:gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                                        M-PREP이란?
                                    </Link>
                                    <Link href="/m-prep-models" className="text-violet-600 hover:text-violet-700 transition-colors whitespace-nowrap flex items-center gap-1.5 lg:gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                                        10사고모델
                                    </Link>
                                    <Link href="/m-prep-cases" className="text-violet-600 hover:text-violet-700 transition-colors whitespace-nowrap flex items-center gap-1.5 lg:gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                                        실무사례
                                    </Link>
                                    <Link href="/m-prep-simulator" className="text-violet-600 hover:text-violet-700 transition-colors whitespace-nowrap flex items-center gap-1.5 lg:gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                                        프롬프트 생성기
                                    </Link>
                                </div>
                            </div>

                            {/* RFP-PREP Pill Link */}
                            <div className="relative flex flex-col items-start mr-0 lg:mr-1 py-4">
                                <Link
                                    href="/prep-rfp"
                                    className="px-3 py-1 lg:px-4 lg:py-2 rounded-full text-[11px] lg:text-sm font-bold whitespace-nowrap border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800 leading-none"
                                >
                                    RFP-제안서
                                </Link>
                            </div>
                        </div>

                        {/* Group 2: Action Buttons (Right Aligned) */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button
                                onClick={() => setShowGuide(true)}
                                className="px-4 py-2 rounded-full text-xs lg:text-sm font-bold whitespace-nowrap transition-all text-slate-600 bg-slate-100/80 hover:bg-slate-200/80 hover:text-slate-900 active:scale-95 shadow-sm border border-slate-200/50"
                            >
                                워크숍
                            </button>
                            <button
                                onClick={() => setShowCoaching(true)}
                                className="px-4 py-2 rounded-full text-xs lg:text-sm font-bold whitespace-nowrap transition-all text-slate-600 bg-slate-100/80 hover:bg-slate-200/80 hover:text-slate-900 active:scale-95 shadow-sm border border-slate-200/50"
                            >
                                1:1 코칭
                            </button>

                            <button
                                onClick={goHome}
                                className="p-2 lg:p-2 xl:p-2.5 rounded-full text-slate-400 hover:text-trust-navy hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 active:scale-95 group"
                                aria-label="Home"
                            >
                                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-slate-600 hover:text-trust-navy transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-md pt-40 px-6 lg:hidden flex flex-col items-center gap-8 animate-in fade-in slide-in-from-top-5 duration-200 overflow-y-auto pb-32">
                    {/* Cheat Key Group */}
                    <div className="flex flex-col items-center gap-3 w-full">
                        <span className="px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-300 bg-emerald-50 text-emerald-700 mb-2 mt-4">
                            Cheat Key
                        </span>
                        <Link
                            href="/about/prep"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-bold text-emerald-600 hover:text-emerald-700"
                        >
                            PREP이란?
                        </Link>
                        <Link
                            href="/prep-word-dancing"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-bold text-emerald-600 hover:text-emerald-700"
                        >
                            워드댄싱
                        </Link>
                        <Link
                            href="/prep-training"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-bold text-emerald-600 hover:text-emerald-700"
                        >
                            스텝 트레이닝
                        </Link>
                        <Link
                            href="/prep-transform"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-bold text-emerald-600 hover:text-emerald-700"
                        >
                            콩떡찰떡
                        </Link>
                        <Link
                            href="/prep-level-check"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-bold text-emerald-600 hover:text-emerald-700"
                        >
                            PREP레벨체크
                        </Link>
                    </div>

                    {/* Master Key Group */}
                    <div className="flex flex-col items-center gap-3 w-full">
                        <span className="px-4 py-1.5 rounded-full text-sm font-bold border border-violet-300 bg-violet-50 text-violet-700 mb-2">
                            Master Key
                        </span>
                        <Link
                            href="/m-prep-intro"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-bold text-violet-600 hover:text-violet-700"
                        >
                            M-PREP이란?
                        </Link>
                        <Link
                            href="/m-prep-models"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-bold text-violet-600 hover:text-violet-700"
                        >
                            10사고모델
                        </Link>
                        <Link
                            href="/m-prep-cases"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-bold text-violet-600 hover:text-violet-700"
                        >
                            실무사례
                        </Link>
                        <Link
                            href="/m-prep-simulator"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-bold text-violet-600 hover:text-violet-700"
                        >
                            프롬프트 생성기
                        </Link>
                    </div>

                    {/* RFP-제안서 Group */}
                    <div className="flex flex-col items-center w-full mt-2">
                        <Link
                            href="/prep-rfp"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-5 py-1.5 rounded-full text-base font-bold border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800 transition-colors"
                        >
                            RFP-제안서
                        </Link>
                    </div>
                    {/* 액션 버튼 그룹 (모바일) */}
                    <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col gap-3 w-full">
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setShowGuide(true);
                                }}
                                className="flex-1 px-6 py-3 rounded-full font-bold border border-slate-200/80 text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all shadow-sm"
                            >
                                워크숍
                            </button>
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setShowCoaching(true);
                                }}
                                className="flex-1 px-6 py-3 rounded-full font-bold border border-slate-200/80 text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all shadow-sm"
                            >
                                1:1 코칭
                            </button>
                        </div>
                    </div>

                    {/* Home Link for Mobile (Icon Only) */}
                    <div className="w-full border-t border-slate-200 mt-6 pt-6 flex justify-center pb-2">
                        <button
                            onClick={goHome}
                            className="p-4 rounded-full text-slate-400 hover:text-trust-navy hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200 active:scale-95 group"
                            aria-label="Home"
                        >
                            <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            )}

            <ProgramGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
            <CoachingModal isOpen={showCoaching} onClose={() => setShowCoaching(false)} />
        </>
    );
}
