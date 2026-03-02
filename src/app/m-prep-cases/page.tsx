"use client";

import { useState } from "react";

const CASES = [
    {
        id: "marketing",
        category: "마케팅",
        icon: "🌱",
        color: "bg-emerald-50 border-emerald-200",
        badgeColor: "bg-emerald-100 text-emerald-700",
        items: [
            {
                id: "mkt-1",
                title: "비건 식당 마케팅 카피",
                before: "비건 식당 마케팅 문구 써줘.",
                after: `[P] 비건 식당의 마케팅 문구 3개를 작성해줘.
[M] 타겟은 환경 보호에 관심이 많은 2030 세대이며, 건강함보다 '힙한 라이프스타일'을 강조해야 해.
[E] 예를 들어, '지구를 구하는 가장 맛있는 방법' 같은 감각적인 문체를 사용해줘.
[P'] 각 문구는 인스타그램 게시물용으로 해시태그를 포함해서 짧게 작성해줘.`,
            },
            {
                id: "mkt-2",
                title: "신제품 론칭 이메일",
                before: "신제품 론칭 이메일 작성해.",
                after: `[P] B2B 신규 SaaS 솔루션 론칭 안내 뉴스레터 초안 작성
[M] PAS(Problem-Agitation-Solution) 구조를 적용하여 독자의 현재 비효율 고충을 자극하고 우리 솔루션으로 자연스럽게 연결
[E] 기존 베타 고객사에서 증명된 '업무 시간 40% 단축' 및 '비용 20% 절감' 데이터 구체적 명시
[P'] 본문 하단에 무료 체험 신청 페이지로 유도하는 직관적인 CTA 버튼 클릭 유도 포함`,
            },
            {
                id: "mkt-3",
                title: "유튜브 숏츠 기획안",
                before: "유튜브 숏츠 아이디어 줘.",
                after: `[P] 20대 대학생 타겟의 금융 플랫폼 앱 구독 유도 유튜브 숏츠 영상 기획안 2종 도출
[M] AIDA(Attention-Interest-Desire-Action) 모델을 30초 숏폼 템포에 맞춰 전면 배치
[E] 초기 이탈을 방어하는 시각적 '후킹(Hooking) 포인트'와 최신 바이럴 밈(Meme) 데이터 전략적 차용
[P'] 각 기획안별 분초 단위 내레이션 스크립트 및 화면 구성(Visual) 디렉션 포함 문서화`,
            },
            {
                id: "mkt-4",
                title: "프로모션 기획 스토리보드",
                before: "프로모션 기획해.",
                after: `[P] 연말 블랙프라이데이 대규모 할인 프로모션 스킴 기획
[M] 구매 여정(Customer Journey Map) 5단계 관점에서 각 터치포인트별 타겟 마케팅 트리거 메시지 구성
[E] 전년도 동일 시즌 베스트셀러 3종 품목의 시간대별 전환율 데이터 우선 반영
[P'] 결제 직전 심리적 저항선을 해소하기 위한 이의 제기 극복(Objection Handling) 논리 및 문구 제안 필수 포함`,
            },
            {
                id: "mkt-5",
                title: "브랜드 슬로건 도출",
                before: "브랜드 슬로건 만들어.",
                after: `[P] 3040 프리미엄 피트니스 센터 리브랜딩 핵심 슬로건 5개 후보안 제안
[M] 가치 제안 캔버스(Value Proposition Canvas) 도구를 적용하여 고객의 'Pain'을 제거하고 'Gain'을 창출하는 메시지로 설계
[E] 상권 내 최고가 정책임에도 이탈이 없는 VVIP 회원 대상 심층 인터뷰 키워드 분석 데이터 활용
[P'] 후보안별 내포된 브랜드 의미와 추후 온/오프라인 마케팅 응용 방향성까지 종합 제시`,
            }
        ]
    },
    {
        id: "hr",
        category: "기획/HR",
        icon: "🏢",
        color: "bg-sky-50 border-sky-200",
        badgeColor: "bg-sky-100 text-sky-700",
        items: [
            {
                id: "hr-1",
                title: "하이브리드 근무 전략 수립",
                before: "재택근무 관련 보고서 써줘.",
                after: `[P] 전략적 하이브리드 근무 도입 방안 수립
[M] 생산성, 직원 만족도, 이직률을 Pareto Principle(80:20)로 비교 분석
[E] 신뢰성 높은 실례(국내외 사례), 공공기관 자료, 전문가 의견 활용
[P'] 직무별 전략적 하이브리드 근무방안을 표 형식으로 제안`,
            },
            {
                id: "hr-2",
                title: "핵심인재 리텐션 기획",
                before: "핵심인재 유지 방안 알려줘.",
                after: `[P] 입사 3~5년차 MZ 핵심인재 이탈 방지를 위한 리텐션 프로그램 기획
[M] Maslow 5단계 욕구 이론 중 '자아실현' 및 '존경'의 관점에서 동기부여 요소 발굴
[E] 최근 IT/스타트업 업계에서 성공적으로 정착한 사내 벤처, 워케이션 등 3가지 대표 사례 벤치마킹
[P'] 단기(금전적 보상 외) 및 장기(성장 로드맵) 관점의 구체적인 실행 방안 5가지 도출`,
            },
            {
                id: "hr-3",
                title: "온보딩 프로세스 고도화",
                before: "신입사원 교육 일정 짜줘.",
                after: `[P] 경력직 수시 채용자의 조기 안착을 위한 4주 온보딩 프로세스 설계
[M] 디자인 씽킹(Design Thinking)의 '사용자 공감(Empathize)' 단계 적용, 기존 경력 입사자의 Pain Point 분석 기반
[E] 첫 출근일, 1주일, 1개월 차에 각각 제공해야 할 필수 정보와 조직 문화 체득 미션 구체화
[P'] 부서장, 버디(Buddy), HR 부서의 역할이 명확히 구분된 4주 체크리스트 형태의 결과물 작성`,
            },
            {
                id: "hr-4",
                title: "다면평가 지표 개발",
                before: "인사평가 항목 만들어.",
                after: `[P] 애자일(Agile) 조직 문화에 적합한 팀장급 다면평가 평가 지표 풀(Pool) 개발
[M] OKR(Objective and Key Results) 달성 지원 역량과 서번트 리더십(Servant Leadership) 관점으로 항목 분류
[E] 정량적 성과 외에 심리적 안전감(Psychological Safety) 조성에 기여하는 정성적 행동 지표 5가지 포함
[P'] 상사, 동료, 팀원 각각의 관점에서 질문하기 좋은 5점 척도 문항 15개 제안`,
            },
            {
                id: "hr-5",
                title: "사내 갈등 중재 가이드",
                before: "직원끼리 싸울 때 어떻게 해?",
                after: `[P] 부서 간 이기주의(Silo) 및 업무 갈등 발생 시 리더의 중재 커뮤니케이션 가이드라인 초안 시뮬레이션
[M] 비폭력 대화(NVC) 모델의 관찰-느낌-필요-요구 4단계를 갈등 상황에 접목
[E] 영업부서와 개발부서 간 일정 지연으로 인한 책임 전가 상황을 구체적인 예시 Case로 설정
[P'] 중재자의 오프닝 멘트, 각 부서의 입장 청취 요령, 합의점 도출을 위한 유도 질문 3가지 스크립트화`,
            }
        ]
    },
    {
        id: "manufacturing",
        category: "제조/현장",
        icon: "🔧",
        color: "bg-orange-50 border-orange-200",
        badgeColor: "bg-orange-100 text-orange-700",
        items: [
            {
                id: "mfg-1",
                title: "치수 불량 원인 분석 및 해결",
                before: "사출 제품 치수 불량 해결책 알려줘.",
                after: `[P] 치수 불량 ±0.05mm 초과 문제 해결
[M] 4M1E(사람·기계·재료·방법·환경) 분석 + 5-Whys 연계 설계
[E] 온도/습도 상관관계 수치 데이터 기반 검증
[P'] 냉각수 압력 1.2bar 상향 조치 등 구체적 개선 제언`,
            },
            {
                id: "mfg-2",
                title: "공정 레이아웃 효율화",
                before: "공장 동선 좀 개선해봐.",
                after: `[P] 물류 이동 동선 최소화를 위한 신규 조립 라인 레이아웃 아이디어 도출
[M] 린 생산(Lean Production) 관점에서 7대 낭비 중 '동작의 낭비'와 '운반의 낭비' 제거에 초점
[E] 기존 U자형 라인과 일자형 라인의 시간당 생산량(UPH) 차이 데이터 및 작업자 피로도 분석 결과 활용
[P'] 자재 공급 위치, 작업자 대기 공간, 불량품 처리 공간이 명시된 최적 레이아웃 스케치 제안`,
            },
            {
                id: "mfg-3",
                title: "설비 예방정비 매뉴얼",
                before: "기계 고장 안 나게 하는 방법 적어.",
                after: `[P] 핵심 생산 설비의 돌발 정지율 제로(0)화를 위한 주간 단위 예방정비(PM) 매뉴얼 초안 작성
[M] TPM(Total Productive Maintenance) 개념을 도입하여 작업자의 자체 보전 활동과 전문 부서의 역할을 명확히 구분
[E] 최근 1년간 발생한 주요 고장 원인 Top 3(윤활 불량, 센서 오염, 모터 과열)에 대한 필수 점검 포인트 포함
[P'] 현장 작업자가 직관적으로 이해할 수 있는 구역별 체크리스트(양호/불량 표기 방식) 형태로 정리`,
            },
            {
                id: "mfg-4",
                title: "재고 최적화 알고리즘",
                before: "자재 재고 관리 어떻게 해?",
                after: `[P] 다품종 소량 생산 라인의 원자재 재고 부족(Shortage) 방지 및 안전 재고 산출 공식 제안
[M] ABC 분석 기법을 통해 자재를 중요도에 따라 분류하고, A등급 자재에 대한 JIT(Just-in-Time) 적용 가능성 검토
[E] 공급망 지연(Lead Time) 리스크를 변수로 반영한 과거 3개월 자재 소요량(BOM) 변동 추이 데이터 활용
[P'] 자재 등급별 발주점(Reorder Point) 및 최적 주문 수량(EOQ) 산출 프로세스를 플로우차트 형태로 설명`,
            },
            {
                id: "mfg-5",
                title: "산업안전 사고 예방",
                before: "공장 안전 교육 자료 만들어.",
                after: `[P] 지게차 충돌 및 끼임 사고 예방을 위한 현장 안전 수칙 및 교육 시나리오 기획
[M] 하인리히 법칙(1:29:300)을 기반으로, 눈에 띄지 않는 아차사고(Near Miss) 보고 활성화 방안 연계
[E] 최근 타사 유사 공정에서 발생한 중대재해 사례를 반면교사로 삼아 경각심 고취 내용 포함
[P'] 작업 전 5분 TBM(Tool Box Meeting)에서 활용 가능한 상황별 행동 요령 3가지와 체크 퀴즈 제공`,
            }
        ]
    },
    {
        id: "strategy",
        category: "경영전략",
        icon: "📈",
        color: "bg-violet-50 border-violet-200",
        badgeColor: "bg-violet-100 text-violet-700",
        items: [
            {
                id: "str-1",
                title: "신규 시장 진출 전략",
                before: "시장 조사 보고서 써줘.",
                after: `[P] 연 매출 100억 달성을 위한 니치 마켓 선점 전략 수립
[M] 3C 분석 및 STP 모델 적용 (전문 기획자의 사고 경로 이식)
[E] 최근 3년 공정위 통계 및 경쟁사 재무 데이터로 증명
[P'] 2030 직장인을 타겟으로 정기구독 모델 도입 제언`,
            },
            {
                id: "str-2",
                title: "M&A 대상 기업 실사",
                before: "인수합병 할 만한 회사 찾아.",
                after: `[P] IT 솔루션 기업 인수를 위한 사업적/재무적 타당성 검토(Due Diligence) 핵심 체크리스트 도출
[M] VRIO 프레임워크를 활용하여 피인수 기업의 핵심 역량이 갖는 희소성 및 모방 불가능성 집중 분석
[E] 최근 2년 내 동종 업계 인수합병 실패 사례의 주요 원인(조직 문화 충돌, 우발 채무)을 리스크 평가에 반영
[P'] 재무, 기술, 인력, 법무 4가지 카테고리로 나눈 실사 요청 자료 목록표(RFI) 양식 작성`,
            },
            {
                id: "str-3",
                title: "ESG 경영 도입 로드맵",
                before: "ESG 경영 준비해.",
                after: `[P] 중소 제조기업의 글로벌 공급망 진입을 위한 3개년 ESG 경영 도입 마스터플랜 수립
[M] PEST 분석을 통해 강화되는 유럽/미주 환경 규제(E)와 공급망 실사법(S), 이사회 구성(G) 등 외부 요인 세밀히 파악
[E] 탄소 배출량 측정, 협력사 노동 인권 가이드라인 제정 등 동종 업계 대기업의 주요 요구 지표 우선순위 적용
[P'] 1년차(진단 및 체계 구축) - 2년차(보고서 발간) - 3년차(글로벌 인증 확보) 단계별 핵심 과제 요약표 제안`,
            },
            {
                id: "str-4",
                title: "비용 절감 최적화 포트폴리오",
                before: "회사 돈 좀 줄여봐.",
                after: `[P] 전사 영업이익률 5% 포인트 개선을 위한 핵심 과제 포트폴리오 및 삭감 우선순위 제안
[M] 제로베이스 예산 편성(ZBB) 관점에서 과거 관행적 지출을 원점에서 재검토하고, MECE 원칙에 따라 비용 구조 분해
[E] 클라우드 인프라 활용 최적화, 마케팅 채널 효율성 검증 등 최근 성공적인 IT 기업의 비용 최적화 사례 도입
[P'] '절감 효과 크기'와 '실행 용이성' 2개 축을 기준으로 한 우선순위 매트릭스(2x2 Matrix)와 단기 실행 과제 3선 제시`,
            },
            {
                id: "str-5",
                title: "시나리오 플래닝 위기 대응",
                before: "위기 상황 대처법 적어.",
                after: `[P] 핵심 원자재 가격 30% 폭등 및 환율 변동성 극대화 상황 대비 경영 시나리오 플래닝
[M] 핵심 불확실성 2가지를 도출하여 낙관-표준-비관의 3가지 복합 시나리오(Scenario Matrix) 구성
[E] 과거 2008년 글로벌 금융위기 당시 원가 상승분을 가격에 전가했던 A기업과 다변화했던 B기업의 실적 변화 데이터 참조
[P'] 가장 발생 확률이 높은 비관적 시나리오 도래 시, 즉각 가동해야 할 비상 경영 체제(Contingency Plan) 1~3단계 행동 지침서 작성`,
            }
        ]
    },
    {
        id: "design",
        category: "디자인",
        icon: "🎨",
        color: "bg-fuchsia-50 border-fuchsia-200",
        badgeColor: "bg-fuchsia-100 text-fuchsia-700",
        items: [
            {
                id: "dsg-1",
                title: "신규 앱 UI/UX 방향성 기획",
                before: "새로운 앱 디자인 컨셉 좀 짜줘.",
                after: `[P] Z세대 타겟의 앱 UI/UX 핵심 디자인 컨셉 도출
[M] SCAMPER 기법을 활용하여 기존 화면의 불필요한 단계 제거(Eliminate) 및 이색적인 경험 결합(Combine)
[E] 최근 글로벌 성공 앱 3곳의 온보딩 이탈률 개선 데이터 참조
[P'] 사용자 시선을 이끄는 메인 화면 레이아웃과 컬러 시스템 구체적 제안`,
            },
            {
                id: "dsg-2",
                title: "브랜드 아이덴티티(BI) 재정립",
                before: "로고 새로 만들어.",
                after: `[P] 친환경 코스메틱 브랜드 리뉴얼을 위한 타이포그래피 및 심볼 디자인 방향성 설정
[M] 게슈탈트(Gestalt) 심리학의 '폐쇄성의 원리' 및 '유사성의 원리'를 적용하여 미니멀하면서도 직관적인 형태 유도
[E] 최근 화장품 업계의 플라스틱 프리(Plastic-free) 캠페인에서 자주 쓰이는 재질감과 어스 컬러(Earth Tone) 팔레트 분석 데이터 반영
[P'] 브랜드의 철학이 담긴 키워드 3가지와 이를 시각적으로 치환한 무드보드(Moodboard) 구성 요소 구체적 제안`,
            },
            {
                id: "dsg-3",
                title: "데이터 시각화 대시보드 구조",
                before: "데이터 한눈에 보이게 표 그려봐.",
                after: `[P] 실무진이 매일 확인하는 매출/트래픽 성과 분석 대시보드 인터페이스 디자인
[M] 정보 디자인의 'Data-Ink Ratio'(데이터를 표현하는 잉크의 비율 최대화) 원칙 적용, 장식적 요소 최소화
[E] 잦은 확인이 필요한 KPI 표출 영역과 심층 분석을 위한 드릴다운(Drill-down) 영역의 시선 추적(Eye-tracking) 효율성 데이터 참조
[P'] 중요도에 따른 정보의 계층(Hierarchy 구성)과 색맹 사용자를 고려한 웹 접근성 준수 컬러 시스템 명시`,
            },
            {
                id: "dsg-4",
                title: "마이크로인터랙션 기획",
                before: "버튼 누를 때 예쁘게 해.",
                after: `[P] 장바구니 담기, 찜하기 등 주요 전환 액션 시 사용자의 심리적 만족감을 높이는 마이크로인터랙션 모션 기획
[M] 디즈니 애니메이션의 12가지 원칙 중 'Anticipation(사전 동작)'과 'Follow Through(후속 동작)' 이론 도입
[E] 과도한 모션이 유발할 수 있는 인지 부조화(Cognitive Dissonance) 및 성능 저하 방지를 위한 모션 지속 시간(Duration) 가이드라인(예: 200~300ms) 엄수
[P'] 액션 발생 전, 중, 후 화면 상태 변화를 설명하는 스토리보드와 모션의 Easing 커브(예: ease-in-out) 값 정의`,
            },
            {
                id: "dsg-5",
                title: "패키지 지기구조 설계",
                before: "상자 디자인 어떻게 할까?",
                after: `[P] 파손 위험이 높은 프리미엄 유리병 음료의 온라인 배송용 친환경 완충 패키지 구조 스케치
[M] 트리즈(TRIZ) 발명 원리 40가지 중 '다용도의 원리(Multifunction)'를 적용, 완충재가 조립 후 진열대로 변형되는 구조 고안
[E] 접착제 사용을 금지하고 100% 펄프 몰드 또는 재생 골판지의 한판 조립(One-piece assembly) 방식만 허용
[P'] 사용자의 개봉 경험(Unboxing UX)을 극대화하기 위한 오픈 탭 위치와 조립 설명 일러스트레이션 삽입 방식 제안`,
            }
        ]
    },
    {
        id: "critical",
        category: "토의/토론",
        icon: "✍️",
        color: "bg-pink-50 border-pink-200",
        badgeColor: "bg-pink-100 text-pink-700",
        items: [
            {
                id: "cri-1",
                title: "AI세 도입 반론 분석",
                before: "AI세 도입에 대해 글 써줘.",
                after: `[P] 'AI세 도입이 필요하다'는 주장의 논리적 허점 분석
[M] 악마의 대변인(Devil's Advocate) 기법으로 반대 입장 강화
[E] 비판 3가지와 반대 입장에서의 가장 강력한 근거 제시
[P'] P-R-E-C-P' 구조로 최종 대안 제시`,
            },
            {
                id: "cri-2",
                title: "주4일제 도입 찬반 토론",
                before: "주4일제 어떻게 생각해?",
                after: `[P] 제조업 생산직군 대상 주4일제 전면 도입에 대한 예비 노사 협상 토론 시나리오 작성
[M] 식스 해트(Six Thinking Hats) 기법 중 논리적 반박을 상징하는 검은 모자(Black Hat)와 낙관적 비전을 제시하는 노란 모자(Yellow Hat) 관점 교차 적용
[E] 도입 후 임금 삭감 우려 및 납기 지연 페널티 위험을 다룬 최신 노동연구원 실태조사 통계 자료 인용
[P'] 찬성 측과 반대 측의 최초 발언, 핵심 논거 2가지, 상대의 허점 지적, 최후 변론으로 이어지는 4단계 토론 스크립트 도출`,
            },
            {
                id: "cri-3",
                title: "공정거래 위반 보도자료 반박",
                before: "우리 회사 기사 변명문 써줘.",
                after: `[P] 자사의 대기업 독과점 남용 행위에 대한 시민단체의 비판 성명서 발표에 대응하는 공식 반박문 초안
[M] 이슈 프레이밍(Framing) 전환 전략을 구사, '독과점 횡포' 프레임을 '소비자 편익 증대 및 글로벌 경쟁력 확보' 프레임으로 리프레이밍
[E] 실제 자사 서비스 런칭 이후 중소 입점 업체의 평균 매출 상승률(예: 15% 증가)과 수수료 인하 내역의 객관적 데이터 팩트체크 기반 서술
[P'] 감정적 호소는 배제하고 법률적 정당성과 시장 경제 원리를 담담하게 짚어내는 PREP(Point-Reason-Example-Point) 구조의 언론 배포용 템플릿 제안`,
            },
            {
                id: "cri-4",
                title: "경쟁사 신제품 약점 공략",
                before: "경쟁사 새 폰 별로라고 소문내.",
                after: `[P] 시장 지배적 경쟁사가 출시한 플래그십 신제품의 핵심 기능 결함을 파고드는 '역바이럴(Negative Campaign)' 방어 논리 분석
[M] 레드팀(Red Teaming) 방식으로 당사 및 경쟁사 신제품의 카탈로그 스펙을 교차 검열하여 기술적 오버엔지니어링(Over-engineering) 요소 발굴
[E] 과거 벤치마크 테스트에서 드러난 과도한 배터리 소모 이슈와 실사용자의 UX 불편 사례 3가지를 공격 포인트로 지정
[P'] 우리 제품이 대안이 될 수 있는 유일한 이유(USP)를 부각하며, 경쟁사의 마케팅 허상을 짚어내는 비교 분석 카드뉴스 기획안 도출`,
            },
            {
                id: "cri-5",
                title: "지방 이전 정책 타당성 검토",
                before: "우리 부서 지방 간다는데 어떡해?",
                after: `[P] 본부의 지방 소재 스마트시티로의 강제 이전 계획에 대한 노조 측의 반대 투쟁 선언문 및 타당성 검토서
[M] 비용-편익 분석(Cost-Benefit Analysis)을 무형의 가치(직원 이탈, 정주 여건 악화, 가족 분리) 영역까지 확장하여 정량화 시도
[E] 과거 유사 공공기관의 혁신도시 이전 이후 발생한 핵심 R&D 인력 퇴사율 급증 및 장기 출장 비용 증가 실제 사례 근거 제출
[P'] 이전을 무조건 반대하기보다, 유예 기간 부여, 순환 근무제 도입, 주거 정착금 대폭 상향 등 협상을 위한 3개의 플랜 B(BATNA) 전략 기획안 수립`,
            }
        ]
    },
];

const renderMprepText = (text: string) => {
    return text.split('\n').map((line, index) => {
        let colorClass = "text-slate-700";
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

export default function MPrepCasesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("marketing");
    // 각 카테고리별로 선택된 아이템의 ID를 유지하는 상태
    const [selectedItems, setSelectedItems] = useState<Record<string, string>>({
        marketing: "mkt-1",
        hr: "hr-1",
        manufacturing: "mfg-1",
        strategy: "str-1",
        design: "dsg-1",
        critical: "cri-1"
    });
    const [copied, setCopied] = useState(false);

    const handleCategoryClick = (catId: string) => {
        setSelectedCategory(catId);
    };

    const handleItemChange = (itemId: string) => {
        setSelectedItems(prev => ({ ...prev, [selectedCategory]: itemId }));
    };

    const currentCat = CASES.find(c => c.id === selectedCategory)!;
    const currentItem = currentCat.items.find(i => i.id === selectedItems[selectedCategory]) || currentCat.items[0];
    if (!currentItem) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(currentItem.after);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100 pt-52 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                        <strong className="text-violet-600">M-PREP</strong> 실무사례
                    </h1>
                    <p className="text-slate-500 text-base max-w-xl mx-auto">
                        <strong className="text-violet-600">일반적인 지시(X)</strong>와 M-PREP 설계를 거친 <strong className="text-violet-600">강력한 지시(O)</strong>의 차이를 확인하세요.
                    </p>
                </div>
                ``
                {/* 사례 탭 */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {CASES.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => handleCategoryClick(c.id)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all active:scale-95 ${selectedCategory === c.id ? 'bg-violet-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-violet-50 border border-slate-200'}`}
                        >
                            {c.icon} {c.category}
                        </button>
                    ))}
                </div>

                {/* 선택된 사례 상세 */}
                <div className="rounded-3xl p-3 md:p-4 border-2 bg-violet-50 border-violet-200 shadow-lg">
                    <div className="bg-white rounded-2xl p-6 md:p-8 pb-8 md:pb-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${currentCat.badgeColor}`}>{currentCat.category}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-black text-slate-800">{currentCat.icon}</span>
                                    {currentCat.items.length > 1 ? (
                                        <select
                                            value={currentItem.id}
                                            onChange={(e) => handleItemChange(e.target.value)}
                                            className="text-lg font-bold text-slate-700 bg-transparent border-b-2 border-slate-200 hover:border-violet-400 focus:outline-none focus:border-violet-500 pb-1 cursor-pointer transition-colors max-w-full md:max-w-sm"
                                        >
                                            {currentCat.items.map(item => (
                                                <option key={item.id} value={item.id} className="text-sm font-medium text-slate-700">{item.title}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <h2 className="text-xl md:text-2xl font-black text-slate-800">{currentItem.title}</h2>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={handleCopy}
                                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 ${copied ? 'bg-emerald-100 text-emerald-700' : 'bg-violet-100 text-violet-700 hover:bg-violet-200 shadow-sm'}`}
                            >
                                {copied ? '✅ 복사됨!' : '📋 M-PREP 복사'}
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Before */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-black text-xs flex items-center justify-center">✕</span>
                                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider">일반적인 지시 (Before)</p>
                                </div>
                                <div className="bg-red-50 rounded-2xl p-5 border border-red-100 h-full">
                                    <p className="text-slate-600 text-[15px] leading-relaxed break-keep">{currentItem.before}</p>
                                </div>
                            </div>

                            {/* After */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 font-black text-xs flex items-center justify-center">✓</span>
                                    <p className="text-xs font-bold text-violet-400 uppercase tracking-wider">M-PREP 설계 (After)</p>
                                </div>
                                <div className="bg-violet-50 rounded-2xl p-5 border border-violet-100 h-full">
                                    <div className="text-[15px] leading-relaxed font-sans break-keep">
                                        {renderMprepText(currentItem.after)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-10">
                    <p className="text-slate-400 mb-4 text-sm">직접 M-PREP을 설계해보고 싶으신가요?</p>
                    <a href="/m-prep-simulator" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-violet-600 text-white font-bold text-lg hover:bg-violet-700 active:scale-95 transition-all shadow-lg">
                        프롬프트 생성기 체험 →
                    </a>
                </div>
            </div>
        </main>
    );
}
