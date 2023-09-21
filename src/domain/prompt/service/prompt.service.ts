import { Stack } from '@/domain/interview/service/interview.model';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class PromptService {
  constructor(private readonly configService: ConfigService) {}

  async aiTutorPrompt(stack: Stack, questionCount: number) {
    // const prompt = `나는 ${stack} 개발자이고, 지원자야. 너는 AI면접관이야. ${stack}관련된 대답을 내가 할건데,
    // 내 대답이 틀리거나 부족하다면 그거에 대한 옳고 그름과 평가를 얘기해주고, 그 다음에 이어서 관련된 꼬리질문을 해줘.
    // 나의 대답은 'Java는 싱글스레드 환경입니다'. A : `;

    const prompt = `\n
    Q: Google 입사 수준의 Java 인터뷰 질문 생성해줘.
    - 기술 스택: ${stack}
    - 검증하고 싶은 내용: [CS, 사용법]
    - 질문 수: ${questionCount}개
    - outputType: json array, 질문 키: question:`;

    const openAI = new OpenAI({
      apiKey: this.configService.get<string>('openAIConfig'),
    });

    const promptResult = await openAI.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const message = promptResult.choices[0].message;
    // console.log(JSON.stringify(message, null, 2));
    // content 문자열을 JSON 객체로 파싱합니다.
    const contentObj = JSON.parse(message.content);

    // question 속성의 값을 추출하여 문자열 배열로 만듭니다.
    const questions = contentObj.map((item) => item.question);

    return questions;
  }
}
