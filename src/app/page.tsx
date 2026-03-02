"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
const ProgramGuideModal = dynamic(() => import("@/components/common/program-guide-modal").then(mod => mod.ProgramGuideModal), { ssr: false });
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LANDING_COPY, COLORS } from "@/lib/constants";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useHomeStore } from "@/store/use-home-store";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export default function Home() {
  const { viewMode, setViewMode } = useHomeStore();
  const [showGuide, setShowGuide] = useState(false);

  const renderTitle = (text: string) => {
    return text.split("*").map((part, index) => (
      index % 2 === 1 ? <span key={index} className="text-gray-900">{part}</span> : part
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Intro Section
  if (viewMode === 'intro') {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white text-gray-900">

        {/* --- BACKGROUND SECTION --- */}
        <div className="absolute inset-0 z-0 bg-slate-50">
          <Image
            src="/images/hero-owl.png"
            alt="Hero Background"
            fill
            className="object-cover object-left opacity-80 mix-blend-multiply"
            priority
          />
          {/* Animated Gradient Background as an Overlay */}
          <AnimatedGradientBackground
            Breathing={true}
            startingGap={70}
            breathingRange={10}
            animationSpeed={0.03}
            gradientColors={[
              "rgba(255,255,255,0)",
              "rgba(16,185,129,0.15)", // emerald base 
              "rgba(139,92,246,0.15)", // violet base
              "rgba(225,29,72,0.15)", // rose base
              "rgba(255,255,255,0.4)",
              "rgba(255,255,255,0.8)",
              "rgba(255,255,255,1)"
            ]}
            gradientStops={[5, 20, 35, 50, 70, 85, 100]}
            containerClassName="mix-blend-multiply"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-white/20 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.8)_80%)]" />
        </div>

        {/* --- NAVIGATION BAR (MOVED TO GLOBAL LAYOUT) --- */}
        {/* <MainNav /> is now in layout.tsx */}

        {/* --- MAIN HERO CONTENT --- */}
        <div className="z-10 flex flex-col items-center gap-24 text-center p-4">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-center font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-trust-navy to-slate-500 mb-4 drop-shadow-sm leading-tight">
              <span className="block text-3xl sm:text-5xl text-rose-600 mb-2 sm:mb-4">"AI 시대, 한·수·위 전략"</span>
              <br />
              <span className="block text-2xl sm:text-4xl mb-2 sm:mb-4">질문의 ‘치트키’  <span className="text-green-600">PREP<span className="text-lg sm:text-2xl font-light"></span></span></span>
              <span className="block text-2xl sm:text-4xl mb-2 sm:mb-4">AI 사고설계의 ‘마스트 키’  <span className="text-violet-600">M-PREP<span className="text-lg sm:text-2xl font-light"></span></span></span>
            </h1>

            {/* [HIDDEN] Original AI Hansuwi Text (Preserved) */}
            {/* 
            <div className="flex items-center justify-center gap-4">
               <span className="h-px w-12 bg-trust-navy/30"></span>
               <span className="text-3xl sm:text-5xl font-bold text-trust-navy tracking-widest ml-4">AI <span className="text-orange-500">한·수·위</span></span>
               <span className="h-px w-12 bg-trust-navy/30"></span>
            </div> 
            */}
          </motion.div>

          {/* --- 상황 선택 리스트 (온보딩 진입 경로) --- */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-xl mt-10"
          >
            <p className="text-md font-semibold text-amber-600 tracking-[0.25em] uppercase mb-4 text-center">지금 내 상황은?</p>

            <div className="space-y-3">

              {/* Row 1 - 머리가 복잡 */}
              <Link href="/prep-word-dancing" className="group flex items-center justify-between gap-6 px-6 py-4 bg-white/75 backdrop-blur-md border border-slate-100 hover:border-emerald-200 hover:bg-white/95 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-5">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                  <div className="text-left">
                    <p className="font-bold text-slate-800 text-sm">머리가 복잡하고 생각정리가 어렵다.</p>
                    <p className="text-xs text-slate-400 mt-0.5">PREP 구조로 생각정리·훈련</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 whitespace-nowrap flex items-center gap-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  PREP 워드댄싱 →
                </span>
              </Link>

              {/* Row 2 - 논리 모델 */}
              <Link href="/m-prep-intro" className="group flex items-center justify-between gap-6 px-6 py-4 bg-white/75 backdrop-blur-md border border-slate-100 hover:border-indigo-200 hover:bg-white/95 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-5">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-indigo-400" />
                  <div className="text-left">
                    <p className="font-bold text-slate-800 text-sm">실무적 문제해결 전략이 필요하다.</p>
                    <p className="text-xs text-slate-400 mt-0.5">AI 사고 설계 프레임워크</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-600 whitespace-nowrap flex items-center gap-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  M-PREP 10사고모델 →
                </span>
              </Link>

              {/* Row 3 - 10대 사고 모델 */}
              <Link href="/m-prep-models" className="hidden group flex items-center justify-between gap-6 px-6 py-4 bg-white/75 backdrop-blur-md border border-slate-100 hover:border-sky-200 hover:bg-white/95 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-5">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-sky-400" />
                  <div className="text-left">
                    <p className="font-bold text-slate-800 text-sm">다양한 문제 해결법을 찾고 싶다.</p>
                    <p className="text-xs text-slate-400 mt-0.5">5-Whys, MECE 등 10가지 검증된 사고 모델</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-sky-600 whitespace-nowrap flex items-center gap-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  10 사고 모델 →
                </span>
              </Link>

              {/* Row 4 - 실무 사례 */}
              <Link href="/m-prep-cases" className="hidden group flex items-center justify-between gap-6 px-6 py-4 bg-white/75 backdrop-blur-md border border-slate-100 hover:border-violet-200 hover:bg-white/95 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-5">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-violet-400" />
                  <div className="text-left">
                    <p className="font-bold text-slate-800 text-sm">M-PREP을 실무에 어떻게 적용하나?</p>
                    <p className="text-xs text-slate-400 mt-0.5">마케팅, 기획, 제조 등 Before & After 비교</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-violet-600 whitespace-nowrap flex items-center gap-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  M-PREP 실무 사례 보기 →
                </span>
              </Link>
              {/* Row 5 - 시뮬레이터 */}
              <Link href="/m-prep-simulator" className="hidden group flex items-center justify-between gap-6 px-6 py-4 bg-white/75 backdrop-blur-md border border-slate-100 hover:border-blue-200 hover:bg-white/95 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-5">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-blue-400" />
                  <div className="text-left">
                    <p className="font-bold text-slate-800 text-sm">나만의 AI 프롬프트를 만들고 싶다.</p>
                    <p className="text-xs text-slate-400 mt-0.5">P-M-E-P' 구조의 강력한 프롬프트 조립하기</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-600 whitespace-nowrap flex items-center gap-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  시뮬레이터 체험 →
                </span>
              </Link>
              {/* Row 6 - RFP로 제안서 만들기 */}
              <Link href="/prep-rfp" className="group flex items-center justify-between gap-6 px-6 py-4 bg-white/75 backdrop-blur-md border border-slate-100 hover:border-blue-200 hover:bg-white/95 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-5">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-blue-400" />
                  <div className="text-left">
                    <p className="font-bold text-slate-800 text-sm">RFP에 최적화된 제안서를 만들고 싶다.</p>
                    <p className="text-xs text-slate-400 mt-0.5">M-PREP 구조의 강력한 제안서 생성하기</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-600 whitespace-nowrap flex items-center gap-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  RFP로 제안서 만들기 →
                </span>
              </Link>

              {/* --- M-PREP Workflow 안내 --- */}
              <div className="hidden mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-indigo-50 border border-indigo-100/50 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 shadow-xl shadow-indigo-100/30">
                <div className="flex items-center gap-3 text-indigo-700 bg-white px-4 py-2 rounded-2xl shadow-sm border border-indigo-50">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-sm font-black text-indigo-700">1</span>
                  <span className="font-bold text-sm">P-M-E-P' 프레임워크 학습 <span className="opacity-50 text-xs ml-1">(Learn)</span></span>
                </div>
                <ArrowRight className="w-5 h-5 text-indigo-300 hidden sm:block drop-shadow-sm" />
                <div className="flex items-center gap-3 text-indigo-700 bg-white px-4 py-2 rounded-2xl shadow-sm border border-indigo-50 mt-2 sm:mt-0">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-sm font-black text-indigo-700">2</span>
                  <span className="font-bold text-sm">시뮬레이터 실전 체험 <span className="opacity-50 text-xs ml-1">(Practice)</span></span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Main Content View
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white">
      {/* Header / Logo */}
      <nav className="absolute top-0 left-0 z-50 w-full p-4 sm:p-10">
        <div className="flex items-center justify-between w-full">
          {/* Left: Page Title */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-trust-navy sm:text-3xl">
              {viewMode === 'ai' ? "PROMPT 한·수·위" : "INTERVIEW 한·수·위"}
            </span>
            <span className="ml-1 h-2 w-2 rounded-full bg-success-green animate-pulse" />
          </div>

          {/* Right: Home Button */}
          <button
            onClick={() => setViewMode('intro')}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-gray-100 transition-all shadow-sm hover:shadow-md focus:outline-none"
          >
            <span className="text-sm font-bold text-trust-navy">홈으로</span>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-trust-navy text-white text-xs">
              <ArrowRight className="h-3 w-3" />
            </span>
          </button>
        </div>
      </nav>

      {/* AI Track Content */}
      {viewMode === 'ai' && (
        <>
          {/* 1. Solution (PREP Method) */}
          <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-70" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-trust-navy sm:text-4xl">
                  {LANDING_COPY.solution.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {LANDING_COPY.solution.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    className="group relative flex flex-col items-center text-center overflow-hidden rounded-xl border border-gray-200 bg-white p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{step.name}</h3>
                    </div>
                    <p className="text-gray-600">{step.desc}</p>
                    <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-8 translate-y-8 rounded-full bg-trust-navy/5 group-hover:bg-trust-navy/10 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 2. Hero Part 1 (First Group) */}
          <section className="relative flex flex-col items-center justify-center px-4 py-12 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex max-w-4xl flex-col items-center gap-6 sm:gap-8"
            >
              <motion.div variants={itemVariants}>
                <span className="rounded-full bg-red-600 px-4 py-1.5 text-base font-bold text-white shadow-lg sm:px-6 sm:py-2 sm:text-lg">
                  {LANDING_COPY.hero_intro.badge}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="whitespace-pre-wrap break-keep text-4xl font-bold tracking-tight text-gray-400 sm:text-6xl lg:text-7xl"
              >
                <span className="block sm:inline">{renderTitle(LANDING_COPY.hero_intro.title)}</span>
              </motion.h1>

              <motion.div variants={itemVariants} className="mt-8 flex">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/prep-training">
                    <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-trust-navy hover:bg-trust-navy/90 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                      PREP 트레이닝 시작하기
                    </Button>
                  </Link>
                  <Link href="/prep-word-dancing">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-2 border-slate-200 text-slate-700 hover:border-trust-navy hover:text-trust-navy hover:bg-white rounded-full font-bold shadow-sm hover:shadow-md transition-all">
                      워드 댄싱 게임하기
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Program Guide Button */}
              <motion.div variants={itemVariants} className="mt-8">
                <Button
                  onClick={() => setShowGuide(true)}
                  variant="ghost"
                  size="lg"
                  className="h-auto py-2 px-6 border border-trust-navy/20 text-trust-navy font-semibold hover:bg-trust-navy/5 rounded-full transition-all text-base"
                >
                  📋 생각의 공식 PREP 워크숍 안내
                </Button>
              </motion.div>
            </motion.div>
          </section>


        </>
      )}

      {/* Interviewer Track Content */}
      {viewMode === 'interviewer' && (
        <>
          {/* Spacer for navbar since Solution section is hidden */}
          <div className="h-24 sm:h-32 bg-white" />

          {/* 3. Problem Section */}
          <section className="bg-indigo-50/50 pt-24 pb-8 sm:pt-32 sm:pb-8 border-t border-indigo-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-trust-navy sm:text-4xl whitespace-pre-wrap break-keep">
                  {LANDING_COPY.problem.title}
                </h2>
              </div>
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
                {LANDING_COPY.problem.cards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-lg ring-1 ring-indigo-100/50"
                  >
                    <span className="text-5xl mb-6">{card.emoji}</span>
                    <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                    <p className="mt-4 text-center text-base text-gray-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Hero Part 2 (Second Group) */}
          <section className="relative flex flex-col items-center justify-center px-4 pt-12 pb-32 text-center bg-indigo-50/50">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex max-w-4xl flex-col items-center gap-6 sm:gap-8"
            >
              <motion.div variants={itemVariants}>
                <span className="rounded-full bg-red-600 px-4 py-1.5 text-base font-bold text-white shadow-lg sm:px-6 sm:py-2 sm:text-lg">
                  {LANDING_COPY.hero_practice.badge}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="whitespace-pre-wrap break-keep text-4xl font-bold tracking-tight text-gray-400 sm:text-6xl lg:text-7xl"
              >
                <span className="block sm:inline">{renderTitle(LANDING_COPY.hero_practice.title)}</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="max-w-2xl whitespace-pre-wrap text-lg text-gray-500 sm:text-2xl"
              >
                {LANDING_COPY.hero_practice.subtitle}
              </motion.p>

              <motion.div variants={itemVariants} className="mt-8 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/prep-training" className="w-full sm:w-auto">
                  <Button size="lg" className="h-16 w-full sm:w-80 bg-success-green text-xl font-bold hover:bg-success-green/90 shadow-xl shadow-success-green/20 transition-all hover:scale-105">
                    {LANDING_COPY.hero_practice.ctaStep}
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/prep-transform" className="w-full sm:w-auto">
                  <Button size="lg" className="h-16 w-full sm:w-80 bg-purple-900 text-xl font-bold text-white hover:bg-purple-800 shadow-xl transition-all hover:scale-105">
                    {LANDING_COPY.hero_practice.ctaTransform}
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>

                {/* NEW: M-PREP Simulator Button */}
                <Link href="/m-prep-simulator" className="w-full sm:w-auto">
                  <Button size="lg" className="h-16 w-full sm:w-80 bg-indigo-600 text-xl font-bold text-white hover:bg-indigo-700 shadow-xl transition-all hover:scale-105 border border-white/20">
                    M-PREP 시뮬레이터
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </section>

          {/* 5. Action (Final CTA) */}
          <section className="relative overflow-hidden bg-trust-navy py-24 sm:py-32">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl whitespace-pre-wrap">
                {LANDING_COPY.action.title}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-blue-100">
                {LANDING_COPY.action.desc}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/prep-training">
                  <Button size="lg" className="h-14 bg-success-green px-8 text-xl font-bold text-white hover:bg-success-green/90 shadow-2xl hover:shadow-success-green/50 hover:-translate-y-1 transition-all">
                    {LANDING_COPY.action.cta}
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer (Always Visible in Sub-views) */}
      <footer className="bg-white py-12 text-center text-sm text-gray-400 border-t">
        <p>Designed by PREPspeach</p>
        <p className="mt-2">Inspired by Prof. Lim Jae-chun&apos;s Logic</p>
      </footer>

      <ProgramGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
}
