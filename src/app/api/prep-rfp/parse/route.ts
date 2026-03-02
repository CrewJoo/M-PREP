import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import mammoth from "mammoth";
import * as xlsx from "xlsx";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "파일이 제공되지 않았습니다." }, { status: 400 });
        }

        // Handle encoded filename from client
        const originalFilename = decodeURIComponent(file.name);

        const buffer = Buffer.from(await file.arrayBuffer());
        let extractedText = "";

        // Parse file based on extension/type
        if (file.type === "application/pdf" || originalFilename.endsWith('.pdf')) {
            const pdfParse = (await import("pdf-parse-new")).default;
            const pdfData = await pdfParse(buffer);
            extractedText = pdfData.text;
        } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || originalFilename.endsWith('.docx')) {
            const docxData = await mammoth.extractRawText({ buffer });
            extractedText = docxData.value;
        } else if (originalFilename.endsWith('.xlsx')) {
            const workbook = xlsx.read(buffer, { type: "buffer" });
            extractedText = workbook.SheetNames.map(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                return sheet ? xlsx.utils.sheet_to_csv(sheet) : "";
            }).filter(Boolean).join("\n---\n");
        } else if (file.type === "text/plain" || originalFilename.endsWith('.txt')) {
            extractedText = buffer.toString("utf-8");
        } else {
            return NextResponse.json({ error: "지원하지 않는 파일 형식입니다. (PDF, DOCX, XLSX, TXT 지원)" }, { status: 400 });
        }

        if (!extractedText || extractedText.trim() === "") {
            return NextResponse.json({ error: "파일에서 텍스트를 추출할 수 없습니다." }, { status: 400 });
        }

        // Limit the extracted text length to avoid token limits for this MVP
        const maxTextLength = 20000;
        if (extractedText.length > maxTextLength) {
            extractedText = extractedText.substring(0, maxTextLength) + "\n...[내용이 길어 일부 생략됨]...";
        }

        // Generate M-PREP prompt using AI
        const instructionPath = path.join(process.cwd(), "rfp-prep.md");
        let baseSystemPrompt = "";
        try {
            baseSystemPrompt = fs.readFileSync(instructionPath, "utf-8");
        } catch (e) {
            console.error("rfp-prep.md not found.", e);
            baseSystemPrompt = "당신은 제안요청서(RFP) 및 회의록 분석 전문가입니다.\n사용자가 제공한 원본 문서를 분석하여, 훌륭한 비즈니스 제안서를 작성하기 위한 'M-PREP 구조'의 프롬프트를 생성해 주세요.";
        }

        const { text: mprepPrompt } = await generateText({
            model: openai("gpt-4o"), // or gpt-4-turbo
            system: `${baseSystemPrompt}\n\n위 가이드라인의 'M-PREP 구조(Point-Method-Evidence-Point')'와 8단계 논리를 완벽하게 숙지하십시오. 당신의 역할은 위 가이드를 바탕으로, 아래 제공된 원본 문서 데이터를 융합하여 완벽한 제안서를 작성해 낼 수 있는 [사전 M-PREP 기획 프롬프트 뼈대]를 스케치해 주는 것입니다. 사용자가 검토할 수 있도록 명확하게 작성하세요.`,
            prompt: `다음은 사용자가 업로드한 원본 문서의 내용입니다. 이 내용을 바탕으로 제안서를 작성할 생성 AI(당신)에게 지시할 구체적인 M-PREP 프롬프트를 생성하세요:\n\n${extractedText}`,
            temperature: 0.7,
        });

        // Return extracted text and the generated M-PREP prompt
        return NextResponse.json({ extractedText, mprepPrompt });

    } catch (error: any) {
        console.error("Error parsing file:", error);

        // Return a clear error message including the details if available
        const errorMessage = error.message || "파일 처리 중 알 수 없는 오류가 발생했습니다.";

        return NextResponse.json(
            { error: `파일 분석 실패: ${errorMessage}` },
            { status: 500 }
        );
    }
}
