"use client";

import { useState, useEffect, useRef } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { useHistoryStore } from "@/lib/history-store";
// import { HomeButton } from "@/components/common/home-button";
import { QUESTIONS_INTERVIEW, QUESTIONS_STUDENT, PrepQuestion } from "@/lib/constants";
import { ModeSelection } from "@/components/prep/mode-selection";
import { usePrepStore } from "@/lib/store";
import { motion } from "framer-motion";
import { WizardLayout } from "@/components/wizard/wizard-layout";
import { ArrowRightLeft, Leaf, Sprout, TreeDeciduous, TreePine, Mountain, RotateCcw, GraduationCap, BookOpen } from "lucide-react";
import { GrowthLevel } from "@/lib/history-store";
import { SkillDashboard } from "@/components/prep/skill-dashboard";

// Define the schema to match the API (for type inference if needed, though useObject handles partials)
const prepSchema = z.object({
    point1: z.string(),
    reason: z.string(),
    example: z.string(),
    point2: z.string(),
    advice: z.string(),
    evaluation: z.object({
        is_relevant: z.boolean(),
        is_structured: z.boolean(),
        is_sufficient: z.boolean(),
    }).optional(),
});

export default function TransformPage() {
    const { mode, setMode, reset } = usePrepStore();
    const store = useHistoryStore();
    const addRecord = store.addRecord;
    const [input, setInput] = useState("");
    const [question, setQuestion] = useState<PrepQuestion | null>(null);
    const [showSavedToast, setShowSavedToast] = useState(false);
    const savedRef = useRef(false);

    useEffect(() => {
        reset();
        // Automatically start with INTERVIEW mode if no mode is set
        setMode('INTERVIEW');
        const list = QUESTIONS_INTERVIEW;
        setQuestion(list[Math.floor(Math.random() * list.length)] ?? null);
    }, [reset, setMode]);

    useEffect(() => {
        if (mode) {
            const list = mode === 'WORK' ? QUESTIONS_STUDENT : QUESTIONS_INTERVIEW;
            setQuestion(list[Math.floor(Math.random() * list.length)] ?? null);
        }
    }, [mode]);

    const { object, submit, isLoading, error } = useObject({
        api: "/api/transform",
        schema: prepSchema,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        submit({ input, question: question?.q } as any);
    };

    // 'object' contains the partial object as it streams in
    const parsedData = object;

    // Auto-save to history when transform is complete
    useEffect(() => {
        if (parsedData && !isLoading && !savedRef.current) {
            savedRef.current = true;
            addRecord({
                type: 'prep-transform',
                createdAt: new Date().toISOString(),
                question: question?.q || 'PREP 변환',
                data: {
                    input,
                    point1: parsedData.point1 || '',
                    reason: parsedData.reason || '',
                    example: parsedData.example || '',
                    point2: parsedData.point2 || '',
                },
                feedback: parsedData.advice || undefined,
            });
            setShowSavedToast(true);
            setTimeout(() => setShowSavedToast(false), 3000);
        }
    }, [parsedData, isLoading]);

    // Reset saved flag when input changes (new submission)
    useEffect(() => {
        savedRef.current = false;
    }, [input]);

    // Tab switcher logic
    const handleTabSwitch = (newMode: 'INTERVIEW' | 'WORK') => {
        if (mode === newMode) return;
        setMode(newMode);
        setInput(""); // 입력 초기화
        savedRef.current = false;
        setShowSavedToast(false);
    };

    // Tab UI Component
    const CategoryTabs = (
        <div className="flex justify-center items-center">
            <div className="hidden sm:bg-slate-100 p-1.5 flex items-center gap-1 rounded-full border border-slate-200 shadow-sm max-w-fit mx-auto overflow-x-auto scroolbar-hide">
                <button
                    onClick={() => handleTabSwitch('INTERVIEW')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${mode === 'INTERVIEW'
                        ? 'bg-white text-amber-600 shadow-md ring-1 ring-slate-200/50 scale-100'
                        : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-700 scale-95'
                        }`}
                >
                    <GraduationCap className="w-5 h-5" />
                    보고 / 기안
                </button>
                <button
                    onClick={() => handleTabSwitch('WORK')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${mode === 'WORK'
                        ? 'bg-white text-amber-600 shadow-md ring-1 ring-slate-200/50 scale-100'
                        : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-700 scale-95'
                        }`}
                >
                    <BookOpen className="w-5 h-5" />
                    이메일 / 메신저
                </button>
            </div>
        </div>
    );

    return (
        <WizardLayout
            title=""
            description=""
            pageTitle={
                <span className="flex items-center justify-center gap-4">
                    <span className="bg-slate-900 rounded-full p-3 flex items-center justify-center shadow-lg">
                        <ArrowRightLeft className="w-10 h-10 text-white" />
                    </span>
                    <span className="text-slate-900">콩떡 찰떡</span>
                </span>
            }
            pageDescription={
                <>
                    <span className="text-amber-600 font-bold">PREP 자동 변환기</span>는 <br />복잡한 설명이나 장황한 아이디어를 입력하면, <br />논리적인 <span className="text-amber-600 font-bold">PREP 구조</span>로 자동 재조립해줍니다.<br className="hidden sm:block" />
                    <br /><span className="text-amber-600 font-bold">콩떡</span>같이 말해도 <span className="text-amber-600 font-bold">찰떡</span>같이 알아듣고 <br />설득력 있는 답변으로 완성합니다.
                </>
            }
            headerAccessory={CategoryTabs}
            theme="amber"
        >
            {/* Saved Toast */}
            {showSavedToast && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-success-green text-white px-5 py-3 rounded-xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 font-bold">
                    <CheckCircle2 className="h-5 w-5" />
                    변환 기록이 저장되었습니다!
                </div>
            )}
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="rounded-2xl bg-white p-8 shadow-xl">
                        <h2 className="mb-6 text-2xl font-bold text-gray-800">나의 생각 (비구조화)</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={`💡 두서없이 떠오르는 생각을 그대로 적어보세요. AI가 PREP 구조로 정리해드립니다.\n\n[작성 예시]\n이번 신규 마케팅 캠페인 도입은 필수적이라고 봅니다. 타겟 고객층의 이탈률이 최근 3개월간 증가하고 있어요. 물론 예산이 들긴 하지만, 경쟁사는 이미 비슷한 캠페인으로 전환율을 30% 높였거든요. 우리도 서둘러야 합니다.`}
                                className="min-h-[400px] text-lg resize-none p-6 leading-relaxed bg-white text-gray-900 border-gray-300 focus:ring-trust-navy"
                            />

                            <Button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="w-full bg-trust-navy py-8 text-xl font-bold hover:bg-trust-navy/90 rounded-xl shadow-lg transition-transform active:scale-95 text-white"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-3">
                                        <Sparkles className="animate-spin h-6 w-6" /> 구조화 분석 중...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-3">
                                        <Sparkles className="h-6 w-6" /> PREP으로 변환하기
                                    </span>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                    <div className="h-full min-h-[600px] rounded-2xl bg-white p-8 shadow-xl flex flex-col">
                        <h2 className="mb-6 text-2xl font-bold text-gray-800">변환 결과 (PREP)</h2>

                        {error && (
                            <div className="flex items-center gap-3 rounded-xl bg-red-50 p-6 text-red-600 text-lg">
                                <AlertCircle className="h-6 w-6" />
                                <p>오류가 발생했습니다. 다시 시도해주세요.</p>
                            </div>
                        )}

                        {!parsedData && !isLoading && !error && (
                            <div className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-xl text-gray-400">
                                왼쪽에서 내용을 입력하고 버튼을 눌러보세요.
                            </div>
                        )}

                        {isLoading && !parsedData && (
                            <div className="flex flex-1 flex-col items-center justify-center gap-6 text-trust-navy animate-pulse">
                                <Sparkles className="h-12 w-12" />
                                <p className="text-xl font-medium">논리 구조를 잡고 있습니다...</p>
                            </div>
                        )}

                        {parsedData && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 overflow-y-auto">
                                {/* AI Direct Coaching (Moved to Top) */}
                                <div className="mb-6 border-b pb-6">
                                    <h3 className="mb-4 text-xl font-bold text-orange-600 flex items-center gap-2">
                                        <Sparkles className="h-5 w-5" /> AI 직설 코칭 (쓴소리)
                                    </h3>
                                    <p className="text-gray-700 text-lg leading-relaxed bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm">
                                        {parsedData.advice}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="rounded-xl bg-blue-50 p-5 shadow-sm border border-blue-100">
                                        <span className="font-bold text-trust-navy text-lg block mb-2">Point (결론)</span>
                                        <p className="text-xl text-gray-900 leading-relaxed">{parsedData.point1}</p>
                                    </div>
                                    <div className="rounded-xl bg-gray-50 p-5 shadow-sm border border-gray-100">
                                        <span className="font-bold text-gray-700 text-lg block mb-2">Reason (이유)</span>
                                        <p className="text-xl text-gray-900 leading-relaxed">{parsedData.reason}</p>
                                    </div>
                                    <div className="rounded-xl bg-gray-50 p-5 shadow-sm border border-gray-100">
                                        <span className="font-bold text-gray-700 text-lg block mb-2">Example (사례)</span>
                                        <p className="text-xl text-gray-900 leading-relaxed">{parsedData.example}</p>
                                    </div>
                                    <div className="rounded-xl bg-blue-50 p-5 shadow-sm border border-blue-100">
                                        <span className="font-bold text-trust-navy text-lg block mb-2">Point (요약)</span>
                                        <p className="text-xl text-gray-900 leading-relaxed">{parsedData.point2}</p>
                                    </div>
                                </div>

                                {/* Retry / New Practice Button */}
                                <div className="pt-6 border-t mt-6 flex justify-end">
                                    <Button
                                        onClick={() => {
                                            setInput("");
                                            reset();
                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                        }}
                                        className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-md text-lg px-6 py-6"
                                    >
                                        <RotateCcw className="mr-2 h-5 w-5" />
                                        새로운 내용 변환하기
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </WizardLayout>
    );
}
