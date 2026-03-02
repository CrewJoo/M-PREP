"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";

const analysisSchema = z.object({
    analysis: z.string(),
    evaluation: z.string(),
    advice: z.string(),
    improved_prompt: z.string()
});

const METHOD_OPTIONS = [
    { value: "", label: "— 사고 모델 선택 (선택 사항) —" },
    { value: "5-Whys 분석: '왜?'를 5번 반복하여 근본 원인을 도출하라.", label: "5-Whys" },
    { value: "MECE 원칙: 중복 없이, 누락 없이 정보를 분류·구조화하라.", label: "MECE" },
    { value: "6 Thinking Hats: 객관·감성·부정·긍정·창의·통제 6가지 관점으로 분석하라.", label: "6 Thinking Hats" },
    { value: "SCAMPER 기법: 대체(S)·결합(C)·적응(A)·수정(M)·용도변경(P)·제거(E)·역발상(R)으로 혁신 아이디어를 도출하라.", label: "SCAMPER" },
    { value: "SWOT 분석: 강점·약점·기회·위협을 분석하고 SO/ST/WO/WT 전략을 도출하라.", label: "SWOT Analysis" },
    { value: "First Principles: 기존 관습 없이 가장 기초적인 사실에서 문제를 분해하고 재조립하라.", label: "First Principles" },
    { value: "Pareto Principle(80:20): 결과의 80%를 만드는 핵심 20% 원인에 집중하라.", label: "Pareto Principle" },
    { value: "Inverse Thinking: '어떻게 하면 완전히 망할까?'를 먼저 생각하고 그 요인들을 사전에 차단하라.", label: "Inverse Thinking" },
    { value: "Eisenhower Matrix: 긴급성×중요도 4분면으로 즉시 실행·위임·제거할 항목을 구분하라.", label: "Eisenhower Matrix" },
    { value: "Jobs to be Done: 고객이 제품을 통해 달성하려는 근본적인 과업(Job)을 정의하고 여정을 설계하라.", label: "Jobs to be Done" },
];

export default function MPrepSimulatorPage() {
    const [p, setP] = useState("");
    const [m, setM] = useState("");
    const [e, setE] = useState("");
    const [p2, setP2] = useState("");
    const [copied, setCopied] = useState(false);
    const [customM, setCustomM] = useState("");

    const { object: analysis, submit: submitAnalyze, isLoading: isAnalyzing } = useObject({
        api: "/api/mprep-analyze",
        schema: analysisSchema,
    });

    const activeM = m || customM;

    const result = [
        p ? `[P] ${p}` : null,
        activeM ? `[M] ${activeM}` : null,
        e ? `[E] ${e}` : null,
        p2 ? `[P'] ${p2}` : null,
    ].filter(Boolean).join("\n");

    const isEmpty = !p && !activeM && !e && !p2;

    const handleCopy = () => {
        if (!isEmpty) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReset = () => {
        setP(""); setM(""); setE(""); setP2(""); setCustomM("");
    };

    const handleAnalyze = () => {
        if (!isEmpty) {
            submitAnalyze({ prompt_content: result });
        }
    };

    const fieldClass = "w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none text-slate-700 text-sm transition-colors resize-none";

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100 pt-52 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">

                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                        <strong className="text-violet-600">M-PREP  </strong> 프롬프트 생성기
                    </h1>
                    <p className="text-slate-500 text-base max-w-lg mx-auto">
                        빈칸을 채우면 <strong className="text-violet-600">M-PREP 구조</strong>의 프롬프트가 자동으로 완성됩니다.<br />
                        완성된 프롬프트를 바로 <strong className="text-violet-600">AI에 붙여넣어 사용</strong>하세요.
                    </p>
                </div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-bold mb-4 tracking-wider">
                    직접 설계해보기
                </span>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                    {/* 입력 영역 */}
                    <div className="p-6 md:p-8 space-y-5">
                        {/* P */}
                        <div>
                            <label className="flex items-center gap-2 mb-2">
                                <span className="w-8 h-8 rounded-full bg-violet-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0">P</span>
                                <span className="font-bold text-slate-700">Point — 목표 정의</span>
                                <span className="text-xs text-slate-400 ml-1">얻고자 하는 최종 결과물은?</span>
                            </label>
                            <textarea
                                rows={2}
                                className={fieldClass}
                                placeholder="예: 전략적 하이브리드 근무 도입을 위한 실행 보고서 작성"
                                value={p}
                                onChange={e => setP(e.target.value)}
                            />
                        </div>

                        {/* M */}
                        <div>
                            <label className="flex items-center gap-2 mb-2">
                                <span className="w-8 h-8 rounded-full bg-violet-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0">M</span>
                                <span className="font-bold text-slate-700">Method — 사고 경로 지정</span>
                                <span className="text-xs text-slate-400 ml-1">어떤 논리 모델을 사용할까?</span>
                            </label>
                            <select
                                className={`${fieldClass} mb-2`}
                                value={m}
                                onChange={e => { setM(e.target.value); setCustomM(""); }}
                            >
                                {METHOD_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                className={fieldClass}
                                placeholder="또는 직접 입력: 예) PEST 분석, 디자인 씽킹 등"
                                value={customM}
                                onChange={e => { setCustomM(e.target.value); setM(""); }}
                            />
                        </div>

                        {/* E */}
                        <div>
                            <label className="flex items-center gap-2 mb-2">
                                <span className="w-8 h-8 rounded-full bg-violet-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0">E</span>
                                <span className="font-bold text-slate-700">Evidence — 데이터·근거 처리</span>
                                <span className="text-xs text-slate-400 ml-1">어떤 데이터·사례·자료를 쓸까?</span>
                            </label>
                            <textarea
                                rows={2}
                                className={fieldClass}
                                placeholder="예: 국내외 하이브리드 근무 도입 기업 사례, 공공기관 자료, 전문가 의견"
                                value={e}
                                onChange={ev => setE(ev.target.value)}
                            />
                        </div>

                        {/* P' */}
                        <div>
                            <label className="flex items-center gap-2 mb-2">
                                <span className="w-8 h-8 rounded-full bg-violet-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0">P'</span>
                                <span className="font-bold text-slate-700">Point' — 최종 제언</span>
                                <span className="text-xs text-slate-400 ml-1">어떤 결과물·제언을 원하는가?</span>
                            </label>
                            <textarea
                                rows={2}
                                className={fieldClass}
                                placeholder="예: 직무별 하이브리드 근무 방안을 표 형식으로 제안"
                                value={p2}
                                onChange={e => setP2(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 결과 미리보기 */}
                    <div className="border-t border-slate-100 bg-slate-50 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">완성된 M-PREP 프롬프트</p>
                            <div className="flex gap-2">
                                <button onClick={handleReset} className="px-3 py-1.5 rounded-full text-xs font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all">초기화</button>
                                <button
                                    onClick={handleAnalyze}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 flex items-center gap-1 ${isEmpty || isAnalyzing ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-slate-800 text-white hover:bg-slate-900 shadow-md'}`}
                                    disabled={isEmpty || isAnalyzing}
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <span className="animate-spin inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full" />
                                            분석 중...
                                        </>
                                    ) : (
                                        <>🔍 분석 / 평가 / 조언</>
                                    )}
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${isEmpty ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : copied ? 'bg-emerald-100 text-emerald-700' : 'bg-violet-600 text-white hover:bg-violet-700 shadow-md'}`}
                                    disabled={isEmpty}
                                >
                                    {copied ? '✅ 복사됨!' : '📋 복사하기'}
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 min-h-[120px]">
                            {isEmpty ? (
                                <p className="text-slate-300 text-sm">위 빈칸을 채우면 여기에 완성된 프롬프트가 나타납니다.</p>
                            ) : (
                                <pre className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-sans">{result}</pre>
                            )}
                        </div>

                        {/* 평가 결과 영역 */}
                        {(analysis || isAnalyzing) && (
                            <div className="mt-8 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                    <span className="text-2xl">🤖</span> AI 프롬프트 분석 리포트
                                </h3>

                                <div className="space-y-6">
                                    {/* 분석 (Analysis) */}
                                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                        <h4 className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                                            <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">🔍</span>
                                            구조 분석
                                        </h4>
                                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                                            {analysis?.analysis || "분석 중..."}
                                        </p>
                                    </div>

                                    {/* 평가 (Evaluation) */}
                                    <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                                        <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-700 mb-3">
                                            <span className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center text-xs">📊</span>
                                            강점 및 약점 평가
                                        </h4>
                                        <p className="text-emerald-800 text-sm leading-relaxed whitespace-pre-wrap">
                                            {analysis?.evaluation || "평가 수행 중..."}
                                        </p>
                                    </div>

                                    {/* 조언 (Advice) */}
                                    <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
                                        <h4 className="flex items-center gap-2 text-sm font-bold text-orange-700 mb-3">
                                            <span className="w-6 h-6 rounded-full bg-orange-200 text-orange-700 flex items-center justify-center text-xs">💡</span>
                                            개선 조언
                                        </h4>
                                        <p className="text-orange-800 text-sm leading-relaxed whitespace-pre-wrap">
                                            {analysis?.advice || "조언 생성 중..."}
                                        </p>
                                    </div>

                                    {/* 개선된 프롬프트 (Improved Prompt) */}
                                    <div className="bg-violet-50 rounded-2xl p-5 border border-violet-100 mt-8 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none"></div>
                                        <h4 className="flex items-center gap-2 text-sm font-bold text-violet-700 mb-3 relative z-10">
                                            <span className="w-6 h-6 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-xs">✨</span>
                                            전문가가 다듬은 최종 프롬프트
                                        </h4>
                                        <div className="bg-white/60 p-4 rounded-xl border border-violet-100/50 relative z-10">
                                            <p className="text-violet-900 text-[15px] font-medium leading-relaxed whitespace-pre-wrap font-sans">
                                                {analysis?.improved_prompt || "최적화 중..."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-center text-slate-400 text-sm mt-6">
                    💡 완성된 프롬프트를 ChatGPT, Claude, Gemini 등 AI에 바로 붙여넣으세요.
                </p>
            </div>
        </main>
    );
}
