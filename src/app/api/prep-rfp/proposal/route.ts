import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { extractedText, mprepPrompt } = body;

        if (!extractedText || !mprepPrompt) {
            return NextResponse.json({ error: "필수 데이터(추출된 텍스트, M-PREP 프롬프트)가 누락되었습니다." }, { status: 400 });
        }

        // Read rfp-prep.md instruction file
        const instructionPath = path.join(process.cwd(), "rfp-prep.md");
        let baseSystemPrompt = "";
        try {
            baseSystemPrompt = fs.readFileSync(instructionPath, "utf-8");
        } catch (e) {
            console.error("rfp-prep.md not found.", e);
            baseSystemPrompt = "당신은 제공된 RFP를 바탕으로 설득력 있는 비즈니스 제안서를 작성하는 수석 기획자입니다.";
        }

        const system = `${baseSystemPrompt}

## 추가 지시사항
사용자가 제공한 원본 문서내용(RFP/회의록)과 M-PREP 프롬프트를 완벽하게 분석하고 준수하여, 전문적인 Markdown 포맷의 제안서 초안을 작성하세요.
반드시 Impact-8 구조를 지켜주세요.`;

        const result = await streamText({
            model: openai("gpt-4o"),
            system: system,
            prompt: `### 1. 사용자가 수정한 M-PREP 지시사항:\n${mprepPrompt}\n\n### 2. 원본 첨부 문서 내용 요약:\n${extractedText}\n\n위의 M-PREP 지시사항과 원본 내용을 바탕으로 최종 제안서를 생성해주세요.`,
            temperature: 0.7,
        });

        return result.toTextStreamResponse();

    } catch (error: any) {
        console.error("Error generating proposal:", error);
        return NextResponse.json(
            { error: "제안서 생성 중 오류가 발생했습니다.", details: error.message },
            { status: 500 }
        );
    }
}
