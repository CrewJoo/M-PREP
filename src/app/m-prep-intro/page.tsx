"use client";

export default function MPrepIntroPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100 pt-52 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* 상단 헤더 */}
                <div className="text-center mb-16">
                    <span className="hidden inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-bold mb-4 tracking-wider">
                        UPGRADED THINKING FRAMEWORK
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-5 leading-tight">
                        <strong className="text-violet-600">M-PREP</strong>이란?
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        기존 PREP(Point-<strong className="text-violet-600">Reason</strong>-Example-Point')에서<br />
                        Reason을 <strong className="text-violet-600">Method(10가지 사고 모델)</strong>로 업그레이드한<br />
                        AI 사고 설계 프레임워크입니다.
                    </p>
                </div>

                {/* PREP → M-PREP 비교 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* 기존 PREP */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">기존 프레임워크</p>
                        <h2 className="text-2xl font-black text-emerald-600 mb-6">PREP</h2>
                        <div className="space-y-4">
                            {[
                                { step: "P", name: "Point", desc: "결론 먼저 — 핵심 주장을 명확하게 전달" },
                                { step: "R", name: "Reason", desc: "이유 제시 — 주장을 뒷받침하는 타당한 근거" },
                                { step: "E", name: "Example", desc: "사례·근거 — 이해를 돕는 구체적인 예시" },
                                { step: "P'", name: "Point", desc: "재강조 — 결론을 다시 한번 요약 및 강조" },
                            ].map((item) => (
                                <div key={item.step} className={`flex items-start gap-4 p-3 rounded-2xl -mx-3 ${item.step === 'R' ? 'border-2 border-dashed border-emerald-400 bg-emerald-50' : 'border-2 border-transparent'
                                    }`}>
                                    <span className="w-10 h-10 flex-shrink-0 rounded-full bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm">{item.step}</span>
                                    <div>
                                        <span className="font-bold text-slate-700">{item.name}</span>
                                        <p className="text-emerald-600 text-xs mt-0.5">{item.desc.split(' — ')[1] ? item.desc : item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* M-PREP */}
                    <div className="bg-gradient-to-br from-violet-300 to-fuchsia-300 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-4">업그레이드 버전(Reason → Method)</p>
                        <h2 className="text-2xl font-black text-slate-600 mb-6">M-PREP</h2>
                        <div className="space-y-4">
                            {[
                                { step: "P", name: "Point", desc: "목표 정의 — 결과물을 단정적 언어로 정의" },
                                { step: "M", name: "Method", desc: "사고 경로 지정 — 논리 모델 이식 (5Whys, MECE…)" },
                                { step: "E", name: "Evidence", desc: "데이터 처리 — 수치로 기대효과 제시" },
                                { step: "P'", name: "Point", desc: "최종 제언 — 목표 달성 여부 검증" },
                            ].map((item) => (
                                <div key={item.step} className={`flex items-start gap-4 p-3 rounded-2xl -mx-3 ${item.step === 'M' ? 'border-2 border-dashed border-white/60 bg-white/20' : 'border-2 border-transparent'
                                    }`}>
                                    <span className="w-10 h-10 flex-shrink-0 rounded-full bg-white/20 text-white font-black flex items-center justify-center text-sm">{item.step}</span>
                                    <div>
                                        <span className="font-bold text-slate-600">{item.name}</span>
                                        <p className="text-slate-600 text-xs mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 핵심 차이점 */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-10">
                    <h2 className="text-xl font-black text-slate-800 mb-6">PREP vs M-PREP: 핵심 차이점</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b-2 border-slate-100">
                                    <th className="text-left pb-4 text-slate-400 font-semibold w-1/4">구분</th>
                                    <th className="text-left pb-4 text-emerald-600 font-black text-lg tracking-wider w-1/3">PREP</th>
                                    <th className="text-left pb-4 text-violet-600 font-black text-lg tracking-wider w-1/3">M-PREP</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[
                                    { cat: "Reason 역할", prep: "직관적 이유/방법 나열", mprep: "검증된 사고 모델(Method) 이식" },
                                    { cat: "사고 수준", prep: "논리적 생각정리", mprep: "아키텍처적 사고 설계" },
                                    { cat: "주요 적용", prep: "스피치·면접·보고서", mprep: "전략 기획·의사결정·컨설팅" },
                                    { cat: "AI 활용", prep: "AI의 입(질문설계)을 통제", mprep: "AI의 뇌(사고설계)를 통제" },
                                ].map((row) => (
                                    <tr key={row.cat}>
                                        <td className="py-4 text-slate-500 font-medium">{row.cat}</td>
                                        <td className="py-4 text-emerald-600 font-medium">{row.prep}</td>
                                        <td className="py-4 text-violet-700 font-semibold">{row.mprep}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <p className="text-slate-400 mb-4 text-sm">다음 단계: 10가지 사고 모델을 직접 체험해보세요</p>
                    <a href="/m-prep-models" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-violet-600 text-white font-bold text-lg hover:bg-violet-700 active:scale-95 transition-all shadow-lg hover:shadow-xl">
                        10 사고모델 보러가기 →
                    </a>
                </div>
            </div>
        </main>
    );
}
