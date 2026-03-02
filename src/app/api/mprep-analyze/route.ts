import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const analysisSchema = z.object({
    analysis: z.string().describe("작성된 M-PREP 프롬프트의 전반적인 논리 구조와 맥락에 대한 분석"),
    evaluation: z.string().describe("프롬프트의 강점과 약점, AI가 명확하게 의도를 파악할 수 있는지에 대한 평가"),
    advice: z.string().describe("프롬프트를 더 강력하고 명확하게 만들기 위한 구체적인 수정 조언 및 개선 방향"),
    improved_prompt: z.string().describe("전문가의 관점에서 보완하여 도출한 '최종 최적화된 M-PREP 프롬프트' (완성된 형태)")
});

export async function POST(req: Request) {
    const { prompt_content } = await req.json();

    const prompt = `
  사용자가 작성한 M-PREP 구조의 프롬프트입니다:
  ===
  ${prompt_content}
  ===
  
  당신의 역할:
  당신은 대한민국 최고의 '프롬프트 엔지니어'이자 '비즈니스 전략 전문가'입니다.
  사용자가 AI 모델(ChatGPT, Claude 등)에게 완벽한 답변을 이끌어내기 위해 작성한 M-PREP(Point, Method, Evidence, Point') 프롬프트를 분석해야 합니다.
  
  지시사항:
  1. [analysis] 필드: 현재 프롬프트가 어떤 의도로 작성되었으며, 각 항목(P, M, E, P')이 유기적으로 잘 연결되어 있는지 정리가 잘 된 평문으로 논리 구조를 분석하세요. (어떤 경우에도 마크다운 ** 굵은 글씨 등 서브 포맷팅을 사용하지 마세요.)
  2. [evaluation] 필드: 프롬프트의 강점과 약점을 명확하게 평가하세요. (마크다운 ** 굵은 글씨 등 서브 포맷팅 금지)
  3. [advice] 필드: 더 완벽한 결과물을 얻기 위해 어떤 텍스트를 추가하거나 수정해야 하는지 3가지 포인트로 정리하세요. (마크다운 ** 굵은 글씨 등 서브 포맷팅 금지)
  4. [improved_prompt] 필드: 당신의 조언을 바탕으로 한 '최적의 M-PREP 프롬프트'를 재작성하여 제공하세요.
  
  어조는 전문가다운 신뢰감을 주면서도, 실질적이고 구체적인 도움을 주는 컨설턴트 톤으로 작성하세요.
  `;

    const result = await streamObject({
        model: openai('gpt-4o'),
        schema: analysisSchema,
        system: "당신은 최고 수준의 프롬프트 엔지니어이자 비즈니스 전략 컴파일러입니다.",
        prompt: prompt,
    });

    return result.toTextStreamResponse();
}
