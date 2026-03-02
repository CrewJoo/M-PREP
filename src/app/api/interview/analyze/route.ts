import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 60; // Analysis might take longer

// Schema for 5D-PREP Matrix and Feedback
const analysisSchema = z.object({
    matrix: z.object({
        dream: z.object({ p: z.string(), r: z.string(), e: z.string(), p2: z.string() }).describe("DREAM 항목의 PREP 구조화"),
        difficulty: z.object({ p: z.string(), r: z.string(), e: z.string(), p2: z.string() }).describe("DIFFICULTY 항목의 PREP 구조화"),
        trend: z.object({ p: z.string(), r: z.string(), e: z.string(), p2: z.string() }).describe("TREND 항목의 PREP 구조화"),
        stand: z.object({ p: z.string(), r: z.string(), e: z.string(), p2: z.string() }).describe("STAND 항목의 PREP 구조화"),
        different: z.object({ p: z.string(), r: z.string(), e: z.string(), p2: z.string() }).describe("DIFFERENT 항목의 PREP 구조화"),
    }),
    feedback: z.object({
        dream: z.string().describe("DREAM 항목에 대한 원포인트 레슨"),
        difficulty: z.string().describe("DIFFICULTY 항목에 대한 원포인트 레슨"),
        trend: z.string().describe("TREND 항목에 대한 원포인트 레슨"),
        stand: z.string().describe("STAND 항목에 대한 원포인트 레슨"),
        different: z.string().describe("DIFFERENT 항목에 대한 원포인트 레슨"),
    }),
    scores: z.object({
        dream: z.number().min(0).max(10).describe("DREAM 항목 평가 점수 (0-10)"),
        difficulty: z.number().min(0).max(10).describe("DIFFICULTY 항목 평가 점수 (0-10)"),
        trend: z.number().min(0).max(10).describe("TREND 항목 평가 점수 (0-10)"),
        stand: z.number().min(0).max(10).describe("STAND 항목 평가 점수 (0-10)"),
        different: z.number().min(0).max(10).describe("DIFFERENT 항목 평가 점수 (0-10)"),
    }).describe("각 항목별 역량 균형도를 나타내는 점수"),
    overallFeedback: z.string().describe("제안 및 기획에 대한 냉정하고 객관적인 종합 평가 (500자 내외). 의사결정자의 시선에서 비즈니스 타당성 부족이나 논리적 비약 등을 직설적으로 언급할 것."),
});

export async function POST(req: Request) {
    const { answers, mode } = await req.json();

    const modeLabel = mode === 'SCHOOL' ? '신입/사원 비즈니스 논리 검증'
        : mode === 'TRANSFER' ? '경력/관리자 비즈니스 전략 검증'
            : '비즈니스 기획 및 제안 심층 평가';

    const context = `
    [Interview Mode]: ${modeLabel}
    
    [Candidate's 5D Answers]
    1. Dream (Vision): ${answers.dream}
    2. Difficulty (Adversity): ${answers.difficulty}
    3. Trend (Insight): ${answers.trend}
    4. Stand (Values): ${answers.stand}
    5. Different (Uniqueness): ${answers.different}
    `;

    const roleDescription = mode === 'TRANSFER'
        ? "You are an expert Business Coach evaluating strategies for senior management."
        : "You are an expert Business Coach evaluating logical structures for new employees.";

    const systemPrompt = `
    # Role
    ${roleDescription}
    Analyze the candidate's 5D answers provided below.
    
    # Tone & Attitude
    **Extremely Cold, Objective, and Professional.**
    - Do not praise unnecessarily.
    - Point out weaknesses directly.
    - Evaluate as if you are deciding whether to pass or fail this candidate in a real high-stakes interview.
    
    # 5D Framework Definition
    1. DREAM: Mission-oriented vision.
    2. DIFFICULTY: Overcoming adversity and lessons learned.
    3. TREND: Insight into industry/social changes.
    4. STAND: Professional ethics and values.
    5. DIFFERENT: Unique originality.

    # Task
    Analyze the provided answers and output the following JSON format:
    1. [Matrix] Refine/Restructure each 5D answer into a PREP format (Point, Reason, Example, Point). Infill missing logic if necessary.
    2. [Feedback] Provide specific, calculating constructive feedback for improvement for each dimension.
    3. [Scores] Evaluate the quality on a scale of 0-10.
    4. [Overall Feedback] Provide a comprehensive, cold, and objective review of the plan/idea. Mention specific strengths but focus on critical logical flaws or areas that need significant improvement to be approved by a C-level executive.
    
    Output in Korean.
    `;

    const result = await streamObject({
        model: openai('gpt-4o'),
        schema: analysisSchema,
        system: systemPrompt,
        prompt: context,
    });

    return result.toTextStreamResponse();
}
