import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class PromptService {
  constructor(private readonly configService: ConfigService) {}

  async aiTutorPrompt() {
    const prompt = `나는 Java 개발자이고, 지원자야. 너는 AI면접관이야. Java관련된 대답을 내가 할건데, 
    내 대답이 틀리거나 부족하다면 그거에 대한 옳고 그름과 평가를 얘기해주고, 그 다음에 이어서 관련된 꼬리질문을 해줘. 
    나의 대답은 'Java는 싱글스레드 환경입니다'. A : `;

    const openAI = new OpenAI({
      apiKey: this.configService.get<string>('openAIConfig'),
    });

    const promptResult = await openAI.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    console.log(promptResult);

    return promptResult;
  }
}
