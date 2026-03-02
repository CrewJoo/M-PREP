"use client";

import { usePrepStore } from "@/lib/store";
import { WizardLayout } from "@/components/wizard/wizard-layout";
import { StepPoint } from "@/components/wizard/step-point";
import { StepReason } from "@/components/wizard/step-reason";
import { StepExample } from "@/components/wizard/step-example";
import { StepPointRe } from "@/components/wizard/step-point-re";
import { FeedbackView } from "@/components/feedback/feedback-view";
import { ModeSelection } from "@/components/prep/mode-selection";
// import { HomeButton } from "@/components/common/home-button";
import { useEffect } from "react";
import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, GraduationCap, BookOpen } from "lucide-react";
import { useHistoryStore, GrowthLevel } from "@/lib/history-store";
import { SkillDashboard } from "@/components/prep/skill-dashboard";
import { ThreeLeavesIcon } from "@/components/icons/three-leaves-icon";
import { QUESTIONS_INTERVIEW, QUESTIONS_STUDENT } from "@/lib/constants";

export default function PrepPage() {
    const { currentStep, mode, setMode, setQuestion, reset } = usePrepStore();
    const store = useHistoryStore();

    useEffect(() => {
        // Reset state on mount to force selection
        reset();
        // Automatically start with INTERVIEW mode if no mode is set
        setMode('INTERVIEW');
        const list = QUESTIONS_INTERVIEW;
        setQuestion(list[Math.floor(Math.random() * list.length)] ?? null);
    }, [reset, setMode, setQuestion]);

    const getStepContent = () => {
        switch (currentStep) {
            case 1:
                return {
                    title: "결론부터 말하세요 (Point)",
                    description: "의사결정자의 뇌는 피로합니다. 두괄식으로 핵심을 꽂아주세요.",
                    component: <StepPoint />,
                };
            case 2:
                return {
                    title: "그 이유는 무엇인가요? (Reason)",
                    description: "단순한 주장이 아닌, 타당한 인과관계를 제시해야 설득됩니다.",
                    component: <StepReason />,
                };
            case 3:
                return {
                    title: "구체적인 증거는? (Example)",
                    description: "데이터·사례·전문가 의견·개인 경험 중, 주장을 가장 설득력 있게 뒷받침하는 증거를 제시하세요.",
                    component: <StepExample />,
                };
            case 4:
                return {
                    title: "마무리 제안 (Point)",
                    description: "앞선 내용을 요약하고, 희망 학과(전공)에 기여할 점을 다시 한 번 강조하세요.",
                    component: <StepPointRe />,
                };
            case 5:
                return {
                    title: "AI 코치의 피드백",
                    description: "당신의 답변을 냉철하게 분석했습니다. 아래 스크립트를 확인하세요.",
                    component: <FeedbackView />
                };
            default:
                return {
                    title: "",
                    description: "",
                    component: null
                };
        }
    };

    // Tab switcher logic
    const handleTabSwitch = (newMode: 'INTERVIEW' | 'WORK') => {
        if (mode === newMode) return;
        setMode(newMode);
        const list = newMode === 'WORK' ? QUESTIONS_STUDENT : QUESTIONS_INTERVIEW;
        setQuestion(list[Math.floor(Math.random() * list.length)] ?? null);
    };

    // Tab UI Component
    const CategoryTabs = (
        <div className="flex justify-center items-center">
            <div className="bg-slate-100 p-1.5 flex items-center gap-1 rounded-full border border-slate-200 shadow-sm max-w-fit mx-auto overflow-x-auto scroolbar-hide">
                <button
                    onClick={() => handleTabSwitch('INTERVIEW')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${mode === 'INTERVIEW'
                        ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200/50 scale-100'
                        : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-700 scale-95'
                        }`}
                >
                    <GraduationCap className="w-5 h-5" />
                    비즈니스 보고 / 기안
                </button>
                <button
                    onClick={() => handleTabSwitch('WORK')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${mode === 'WORK'
                        ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200/50 scale-100'
                        : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-700 scale-95'
                        }`}
                >
                    <BookOpen className="w-5 h-5" />
                    이메일 / 메신저
                </button>
            </div>
        </div>
    );

    const stepInfo = getStepContent();

    return (
        <WizardLayout
            title={stepInfo.title}
            description={stepInfo.description}
            pageTitle={
                <span className="flex items-center justify-center gap-3">
                    <span className="bg-slate-900 rounded-full p-2.5 flex items-center justify-center shadow-lg">
                        <Dumbbell className="w-8 h-8 text-white" />
                    </span>
                    <span className="text-slate-900">스텝 트레이닝</span>
                </span>
            }
            pageDescription={
                <>
                    <span className="text-blue-600 font-bold">PREP 트레이닝</span>은 주어진 질문에 대해 논리적으로 답변하는 실전 훈련입니다.<br className="hidden sm:block" />
                    Point(결론), Reason(이유), Example(사례), Point(결론 재강조)의 4단계를 따라가며 구조적인 말하기/글쓰기를 체화하고, <br className="hidden sm:block" />
                    마지막에 <span className="text-blue-600 font-bold">AI 코치</span>에게 답변에 대한 상세한 피드백을 받아보세요.
                </>
            }
            headerAccessory={currentStep === 1 ? CategoryTabs : null}
            theme="blue"
        >
            {stepInfo.component}
        </WizardLayout>
    );
}
