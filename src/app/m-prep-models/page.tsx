"use client";

import { useState } from "react";

const MODELS = [
    {
        id: "5whys", name: "5-Whys", icon: "❓", color: "bg-white border-slate-100 hover:border-rose-300 text-slate-800", tagColor: "bg-rose-100 text-rose-600", desc: "현상의 이면에 숨겨진 근본 원인(Root Cause)을 단계적으로 파고들어 발본색원하는 강력한 인과관계 분석 기법", prompt: "발생한 현상에 대해 \"왜 그런가?\"라는 질문을 5단계 깊이로 연속해서 파고들며, 피상적인 이유가 아닌 실질적이고 근본적인 원인(Root Cause)을 식별하여 구조화하라.", example: "매출 하락 원인 분석 → 왜 하락했나? (신규 유입 감소) → 왜 감소했나? (핵심 캠페인 전환율 저조) → 왜 저조했나? (타겟 마케팅 메시지 불일치) → 왜 불일치했나? (사전 고객 페르소나 리서치 실패) → 왜 리서치 실패했나? (데이터 분석 인력 및 예산 부족)",
        mprepExample: "[P] 핵심 캠페인 전환율 저조 원인 진단 및 해결책 도출\n[M] '5-Whys' 모델을 적용하여 '매출 하락 → 전환율 저조 → 메시지 불일치 → 사전 리서치 실패 → 데이터 인력 부재'의 근본 원인 추적\n[E] 캠페인 CTR(클릭률) 최근 1주간 40% 급감 및 이탈률 데이터 기반\n[P'] 신규 퍼포먼스 마케터 즉각 채용 및 초기 분석 데이터 A/B 테스트 예산 긴급 배정 요청"
    },
    {
        id: "mece", name: "MECE", icon: "🗂️", color: "bg-white border-slate-100 hover:border-sky-300 text-slate-800", tagColor: "bg-sky-100 text-sky-600", desc: "어떤 사안을 중복되지 않게(Mutually Exclusive), 누락 없이(Collectively Exhaustive) 전체 모수로 빈틈없이 구조화하는 원칙", prompt: "해결하고자 하는 과제를 Mutually Exclusive(상호 배타적)이고 Collectively Exhaustive(전체 포괄적)인 기준에 따라 빈틈없이, 겹침 없이 논리적인 트리 형태로 분류하라.", example: "B2B 소프트웨어 타겟 고객 세분화 → 기업 규모별(대기업/중견기업/스타트업) 분리 및 도입 목적별(신규도입 검토/기존 고도화/부분 도입) 등의 축으로 중복과 누락 없이 완벽히 고객군을 매핑.",
        mprepExample: "[P] 신규 B2B 소프트웨어 론칭을 위한 세분화된 고객 타겟팅 전략 수립\n[M] 'MECE' 프레임워크를 활용해 전체 잠재 고객을 [규모별: 대/중/소] 및 [도입 단계별: 신규/전환/확장]로 중복과 누락 없이 그룹화\n[E] 그룹별 최적화된 마케팅 비용 대비 예상 ROAS (대기업 선도입 시 300% 달성 기대) 수치 산출\n[P'] 가장 전환율이 높을 것으로 예상되는 규모별/단계별 핵심 2개 그룹에 예산 70% 집중 투자 제안"
    },
    {
        id: "6hats", name: "6 Thinking Hats", icon: "🎩", color: "bg-white border-slate-100 hover:border-amber-300 text-slate-800", tagColor: "bg-amber-100 text-amber-600", desc: "주제를 빠짐없이 다루기 위해 하얀색(팩트)부터 파란색(결론)까지 6가지 배타적 관점 모자로 분리시켜 리뷰하는 다각도 관점 기법", prompt: "현재 직면한 사안을 하얀색(팩트/데이터), 빨간색(감정/직관), 검은색(위험/비판), 노란색(이점/긍정), 초록색(창의/대안), 파란색(과정 통제/결론)의 6가지 관점 모자를 일제히 번갈아 쓰며 입체적인 분석을 수행하라.", example: "주 4일제 도입 검토 → 흰 모자(생산성 데이터 변화 추이), 빨간 모자(직원 휴식 만족도), 검은 모자(일정 딜레이 리스크), 노란 모자(채용 매력도 극대화), 초록 모자(비동기 커뮤니케이션 툴 도입 방안), 파란 모자(최종 파일럿 테스트 결론 정리).",
        mprepExample: "[P] 사내 '주 4일제' 근무 형태 파일럿 테스트 전면 도입 제언\n[M] '6 Thinking Hats' 관점으로 흰색(타사 생산성 지표), 검은색(납기 지연 리스크), 초록색(AI 업무 자동화 툴 도입 대안) 등을 입체적으로 검토\n[E] 파일럿 도입 시 예상되는 임직원 퇴사율 15% 감소 가능성 및 시스템 보완 비용 지표\n[P'] 리스크를 상쇄할 비동기 협업 툴(초록 모자) 시범 운용과 함께 R&D 부서 대상 3개월 우선 도입 확정"
    },
    {
        id: "scamper", name: "SCAMPER", icon: "🔀", color: "bg-white border-slate-100 hover:border-violet-300 text-slate-800", tagColor: "bg-violet-100 text-violet-600", desc: "기존의 프로세스나 제품을 대체·결합·용도변경 등 7가지 도발적인 질문을 통해 비틀어 파괴적인 대안을 도출하는 아이디어 발상법", prompt: "주어진 대상에 대해 대체(Substitute), 결합(Combine), 응용(Adapt), 변형(Modify), 용도 변경(Put to another use), 제거(Eliminate), 역발상(Reverse)의 7가지 렌즈를 투영하여 가장 파괴적이고 혁신적인 아이디어를 도출하라.", example: "오프라인 서점 수익화 구조 개선 → 대체(책 향기를 파는 공간으로), 결합(서점+위스키 바), 용도 변경(서점을 자정 이후 심야 몰입 공유 오피스화), 제거(결제 데스크 제거 및 완전 무인화), 역접(책을 팔지 않고 빌려만 주는 멤버십 모델).",
        mprepExample: "[P] 적자 오프라인 서점의 신규 수익 창출을 위한 비즈니스 모델 혁신\n[M] 'SCAMPER' 중 결합(서점+위스키 바)과 역접(책 판매가 아닌 공간 구독) 필터를 통해 지식형 공유 오피스로의 변형 도출\n[E] 기존 단순 도서 판매 마진(10%) 대비, 음료 및 멤버십 기반의 공간 대여 마진(60% 이상) 수익성 시뮬레이션 결과\n[P'] 메인 매장 절반을 야간 멤버십 전용 몰입형 라운지로 개조하는 레노베이션 즉각 착수"
    },
    {
        id: "swot", name: "SWOT Analysis", icon: "📊", color: "bg-white border-slate-100 hover:border-emerald-300 text-slate-800", tagColor: "bg-emerald-100 text-emerald-600", desc: "내부의 강점(S)·약점(W)과 외부의 기회(O)·위협(T)을 객관적으로 진단 후, 이를 교차 배열(Cross-SWOT)하여 구체적인 궁극적 액션 플랜을 도출하는 툴", prompt: "현재 비즈니스 환경을 내부 역량인 강점(Strength)과 약점(Weakness), 외부 환경인 기회(Opportunity)와 위협(Threat) 매트릭스로 엄밀히 분석하라. 이를 토대로 강점을 극대화하는 SO 전략, 약점을 보완하는 WO, 위협을 정면 돌파/회피하는 ST, 생존을 위한 WT 액션 플랜을 도출하라.", example: "신진 비건 화장품 브랜드 전략 수립 방안 → SO(강력한 친환경 철학 × MZ 브랜드 가치소비 트렌드 대응 마케팅 집중), WT(낮은 인지도 × 대기업 견제 위협 대응을 위한 니치 커뮤니티 전용 한정판 연계).",
        mprepExample: "[P] 신규 비건 뷰티 브랜드 론칭 초기 핵심 침투 마케팅 전략 수립\n[M] 'Cross-SWOT'을 활용해 강점(진성 친환경)과 기회(가치소비 트렌드)를 결합한 SO 전략 및 한정판 커뮤니티(WT 전략) 우선순위 도출\n[E] 경쟁사 대비 월등한 성분 안전성 수치 및 타겟 커뮤니티 활성도 지표(MAU 최소 5만 확보)\n[P'] 대중 브랜딩보다, 진성 팬덤 확보를 위한 비건 커뮤니티 독점 선런칭 및 팝업 스토어 집중 전개 제안"
    },
    {
        id: "first", name: "First Principles", icon: "⚡", color: "bg-white border-slate-100 hover:border-orange-300 text-slate-800", tagColor: "bg-orange-100 text-orange-600", desc: "복잡하게 얽힌 업계의 편견이나 관습을 배제하고, 더 이상 쪼갤 수 없는 '물리적/논리적 절대 진리'에서부터 다시 논리를 쌓아올리는 혁신 기법", prompt: "이 문제에 얽혀 있는 기존의 관행, 업계 상식, 과거 사례를 완전히 배제하라. 더 이상 증명할 수 없는 1차원적 절대 진리(First Principle)로 문제를 역어셈블한 뒤, 그 절대적 기반 위에서 구조적 한계를 깨부수는 솔루션을 백지에서 처음부터 조립하라.", example: "물류 단가 절감 딜레마 극복 → 상식: \"택배사 운임을 깎자.\" → 제1원리: \"택배비의 물리적 요소는 부피와 무게다. 포장 공기의 부피를 50% 빼 트럭 하나에 물량을 2배 싣는 구조를 만들자.\"",
        mprepExample: "[P] 만성적인 물류 배송 단가 절감을 위한 구조적 한계 극복\n[M] '1차원적 제1원리(First Principles)'로 접근해 운임 협상이 아닌 '물리적 부피 최소화'라는 가장 본질적인 수단에 집중 설계\n[E] 완충재 부피 50%를 줄이는 신규 패키징 적용 시, 트럭당 적재 공간 1.8배 증가 및 연간 운임 20% 절감 가능성 통계\n[P'] 기존 택배사 단가 협상을 멈추고, 제품 포장재 공압축 리뉴얼 프로젝트 우선 실행 결의"
    },
    {
        id: "pareto", name: "Pareto Principle", icon: "📈", color: "bg-white border-slate-100 hover:border-pink-300 text-slate-800", tagColor: "bg-pink-100 text-pink-600", desc: "전체 결과의 80%를 지배하는 비대칭적 소수인 핵심 20%의 '결정적 변수(Vital Few)'를 찾아 한정된 자원의 투입 가성비를 극대화하는 기법", prompt: "80대 20 법칙(Pareto Principle)에 철저히 입각하여, 발생하고 있는 목표 성과의 80% 또는 전체 문제의 80%를 단독 야기하는 핵심적인 20%의 원인(Vital Few) 변수를 정확히 발굴하고, 가용 리소스를 그 지점에 전면 집중하는 전략을 설계하라.", example: "소프트웨어 CS 응대 비용 폭증 방어 → 전체 유저 문의 중 상위 20% 분류인 '비밀번호 재발급 및 계정 잠금' 이슈가 리소스의 80%를 초래함을 확인. 오직 해당 20% 분류 프로세스만 AI 및 자동화 솔루션으로 대체하여 즉각적인 고정비 방어 달성.",
        mprepExample: "[P] 기하급수적으로 폭증하는 CS 운영 고정 비용 최소화 및 효율 재편\n[M] '파레토 법칙'을 적용, 전체 티켓 트래픽의 80%를 점유하는 상위 20% 단순 반복 문의(계정/비밀번호 해제) 추출 집중\n[E] 해당 20% 유형을 AI 챗봇 및 셀프 서비스로 강제 전환할 경우 초래되는 인건비 월 1,500만 원 절감 효과\n[P'] 복잡한 VOC 시스템 개편을 일시 중단하고, 상위 20% 문의 전용 원클릭 해소 AI 챗봇 모듈 이번 주 내 런칭"
    },
    {
        id: "inverse", name: "Inverse Thinking", icon: "🔃", color: "bg-white border-slate-100 hover:border-slate-400 text-slate-800", tagColor: "bg-slate-100 text-slate-600", desc: "\"어떻게 성공할까?\"가 아닌 \"무엇이 우리를 철저히 망쳐놓을까?\"를 반대로 상상하여 치명적 파괴 위기를 사전 차단하는 역발상 리스크 방어 로직", prompt: "주어진 프로젝트가 순조롭게 목표 달성하는 시나리오 대신, '어떻게 하면 이 프로젝트를 역사상 가장 처참하고 완벽하게 실패시킬 수 있을까?'를 치열하고 극단적으로 시뮬레이션하라. 도출된 파멸 요인들을 전부 뒤집어 무결점의 역산 방어선(Anti-Failure 방침)을 세워라.", example: "초거대 프리미엄 론칭 프로모션 기획 → 폭망 로직: 론칭 당일 웹 서버 붕괴, 쿠폰 발행액 초과 유출 방치. → 역산 대비책 구축: 서버 이중화 스트레스 테스트 10회 강행, 쿠폰 지급액 상한선 트리거 및 긴급 Kill-Switch 도입.",
        mprepExample: "[P] 천문학적 예산이 투입된 초거대 신규 앱 론칭 당일 치명적 리스크 원천 차단\n[M] '역발상(Inverse Thinking)'으로 유저 이탈과 서버 폭발 시나리오를 고의로 상상, 환불 사태와 쿠폰 한도 초과 오류 로직 역산 추출\n[E] 과거 유사 이벤트 실패 시 서버 복구에 소요된 6시간과 쿠폰 부정 수급 피해액 5억 원의 타사 치명타 데이터\n[P'] 메인 캠페인 진행 전 트래픽 초과 시 자동 임시 대기열 전환 시스템 및 쿠폰 발행량 하드락 코딩 선반영 필수 의무화"
    },
    {
        id: "eisenhower", name: "Eisenhower Matrix", icon: "🗓️", color: "bg-white border-slate-100 hover:border-teal-300 text-slate-800", tagColor: "bg-teal-100 text-teal-600", desc: "해야 할 과업들을 '목표 달성의 중요도'와 '데드라인 긴급성'의 2축 4분면에 엄격히 매핑시켜 리더의 진짜 우선순위를 결단하는 매트릭스", prompt: "산재되어 있는 과업과 전략 옵션들을 '목표 달성에 기여하는 절대적 중요도(Importance)'와 '지금 당장 처리해야만 하는 긴급성(Urgency)'이라는 두 가지 축을 기준으로 아이젠하워 4분면 매트릭스에 매핑하라. 이를 Do(즉시 실행), Schedule(계획), Delegate(위임), Delete(제거)로 냉정히 분류하라.", example: "신임 팀장 취임 100일 과제 정리 → 긴급+중요(주요 클라이언트 이탈 불만 즉각 응대), 비긴급+중요(하반기 사업 파이프라인 리뉴얼 계획 워크샵), 긴급+비중요(일일 매출 변동성 보고서 취합 → 부사수에게 위임), 비긴급+비중요(의미 없고 소모적인 주간 정례 회의 → 전격 폐지).",
        mprepExample: "[P] 스타트업 실장 취임 직후 산발적인 50개 과업 우선순위 세팅 및 리소스 최적화\n[M] '아이젠하워 매트릭스'를 도입해 주요 클라이언트 방어(Do), 중장기 비전(Schedule), 단순 보고(Delegate), 불필요 회의(Delete)로 철저히 분류\n[E] 리더 본인의 핵심 몰입 시간을 주당 20시간 추가 확보하여 발생하는 직접적인 주요 프로젝트 속도 향상 지표\n[P'] 당장 3개 고객사 클레임 방어에 본인 공수를 100% 투입하고, 주단위 단순 수취 업무는 사원급으로 전격 이관 및 자동화 확정"
    },
    {
        id: "jtbd", name: "Jobs to be Done", icon: "🎯", color: "bg-white border-slate-100 hover:border-indigo-300 text-slate-800", tagColor: "bg-indigo-100 text-indigo-600", desc: "고객이 물리적으로 '제품'을 사는 것이 아니라, 자신의 복합적인 생활 문맥(Context) 속에서 어떤 본질적 과제(Job)를 해결하려 제품을 '고용'한다는 이론", prompt: "고객이 표현하는 표면적이고 1차원적인 아이템 니즈(Needs)를 우회하여, 특정한 제약 상황과 감정적 결핍 속에서 궁극적으로 해소하고자 하는 심층적인 근본 과업(Jobs to be Done)을 본질적으로 통찰하라. 제품이 완벽한 '고용 직원'으로서 그 과업을 수행하는 핏(Fit)을 맞춰 설계하라.", example: "프리미엄 HMR(밀키트) 기획 타겟팅 → 표면 니즈: \"빠르게 저녁 식사를 하고 싶다.\" → 진단된 Job: \"퇴근 후 지쳐서 요리할 힘은 없지만, 배 백죄책감 없이 나 스스로를 대접하는 근사한 보상 과정을 고용하고 싶다.\" → 세척/메인 조리는 생략하되 감각적인 최종 플레이팅 경험만 선사하는 구성으로 기획 극대화.",
        mprepExample: "[P] MZ세대 타겟 프리미엄 밀키트 하반기 리뉴얼 신제품 기획 방향 타결\n[M] 'JTBD' 관점으로 접근하여 특성상 '최소의 수고로 얻는 고급 레스토랑 수준의 심리적 보상과 자존감 회복'이라는 진짜 근본 과업 도출\n[E] 기존의 '조리 속도' 조명 대비, '예쁜 플레이팅' 특화 제품 리뷰 및 SNS 유저 생성 콘텐츠(UGC) 300% 증가분 분석 결과\n[P'] 불편한 조리 과정 전체를 레토르트화 하되, 유기농 토핑 및 무드등 연출 가이드 동봉 등 시각적 보상 경험 중심의 라인 확정"
    }
];

const renderMprepText = (text: string) => {
    return text.split('\n').map((line, index) => {
        let colorClass = "text-violet-900/80";
        if (line.trim().startsWith("[P]")) colorClass = "text-red-500 font-semibold";
        else if (line.trim().startsWith("[M]")) colorClass = "text-blue-500 font-semibold";
        else if (line.trim().startsWith("[E]")) colorClass = "text-green-500 font-semibold";
        else if (line.trim().startsWith("[P']")) colorClass = "text-orange-500 font-semibold";

        return (
            <span key={index} className={`block mb-1 last:mb-0 ${colorClass}`}>
                {line}
            </span>
        );
    });
};

export default function MPrepModelsPage() {
    const [selected, setSelected] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const selectedModel = MODELS.find(m => m.id === selected);

    const handleCopy = () => {
        if (selectedModel) {
            navigator.clipboard.writeText(`[M] ${selectedModel.prompt}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100 pt-52 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <span className="hidden inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-bold mb-4 tracking-wider">
                        AI 뇌 설계 도구
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
                        <strong className="text-violet-600">M-PREP</strong> 10사고 모델
                    </h1>
                    <p className="text-slate-500 text-base md:text-[15px] font-medium max-w-2xl mx-auto leading-relaxed word-break-keep">
                        M-PREP의 핵심인 <strong className="text-violet-600">M(Method)</strong> 단계에서 활용할 수 있는
                        <br />검증된 <strong className="text-violet-600">10가지 글로벌 사고 프레임워크</strong>입니다.
                        <br />전략 기획부터 문제 해결까지, 상황에 맞는 카드를 선택해 보세요.
                    </p>
                </div>

                {/* 모델 카드 그리드 */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                    {MODELS.map((model) => (
                        <button
                            key={model.id}
                            onClick={() => setSelected(model.id === selected ? null : model.id)}
                            className={`flex flex-col items-center justify-center text-center rounded-2xl p-6 border transition-all duration-300 active:scale-95 ${model.color} ${selected === model.id ? 'ring-4 ring-violet-500 ring-opacity-50 scale-[1.03] shadow-xl border-transparent z-10 bg-white' : 'shadow-sm hover:shadow-lg hover:-translate-y-1'}`}
                        >
                            <div className="text-4xl mb-3 drop-shadow-sm transition-transform duration-300 group-hover:scale-110">{model.icon}</div>
                            <p className="font-extrabold text-sm md:text-base leading-tight tracking-tight">{model.name}</p>
                        </button>
                    ))}
                </div>

                {/* 상세 패널 */}
                {selectedModel && (
                    <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-2xl shadow-violet-100/50 animate-in zoom-in-95 duration-300 relative overflow-hidden">
                        {/* Decorative Background Blob */}
                        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-gradient-to-br from-violet-50 to-purple-50 rounded-full opacity-50 blur-3xl mix-blend-multiply pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase ${selectedModel.tagColor} shadow-sm`}>METHOD</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-800 drop-shadow-sm flex items-center gap-3">
                                    <span className="text-4xl md:text-5xl">{selectedModel.icon}</span>
                                    {selectedModel.name}
                                </h2>
                                <p className="text-slate-500 mt-3 text-lg font-medium max-w-2xl leading-relaxed">{selectedModel.desc}</p>
                            </div>
                            <button
                                onClick={handleCopy}
                                className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-extrabold transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md ${copied ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-violet-600 text-white hover:bg-violet-700 shadow-violet-200 hover:-translate-y-0.5'}`}
                            >
                                {copied ? '✅ 복사 완료!' : '📋 AI 프롬프트 복사하기'}
                            </button>
                        </div>

                        <div className="relative z-10 grid md:grid-cols-2 gap-6">
                            <div className="group bg-gradient-to-br from-slate-50 to-slate-100/80 rounded-2xl p-6 border border-slate-200/60 shadow-inner transition-all hover:border-slate-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">M</div>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">메타 프롬프트에 삽입</p>
                                </div>
                                <p className="text-slate-800 text-[15px] leading-relaxed font-medium">[M] {selectedModel.prompt}</p>
                            </div>
                            <div className="group bg-gradient-to-br from-violet-50/80 to-purple-50/50 rounded-2xl p-6 border border-violet-100/60 transition-all hover:border-violet-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-violet-200 flex items-center justify-center text-violet-600 font-bold text-xs">💡</div>
                                    <p className="text-sm font-bold text-violet-500 uppercase tracking-wider">실무 적용 예시</p>
                                </div>
                                <p className="text-violet-900 text-[15px] leading-relaxed font-medium">{selectedModel.example}</p>
                                {'mprepExample' in selectedModel && (
                                    <div className="mt-5 pt-5 border-t border-violet-100/60">
                                        <p className="flex items-center gap-2 text-sm font-bold text-violet-500 mb-3 uppercase tracking-wider">
                                            <span className="text-base">📝</span> M-PREP 프롬프트 예시
                                        </p>
                                        <div className="text-[15px] leading-relaxed font-medium">
                                            {renderMprepText(selectedModel.mprepExample as string)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
