import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { PromptService } from '../prompt/service/prompt.service';

@Injectable()
export class questionCollectorService {
  constructor(private readonly promptService: PromptService) {}

  //TODO: 매일 자정에 실행되도록 설정
  // GPT에게 물어보던지 아니면 크롤링을 하던지
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async questionCollector() {
    const prompt = `
    AI Tutor: 안녕하세요. 저는 AI Tutor입니다. 무엇을 도와드릴까요?
    오늘 질문할 JAVA



    `;

    const promptResult = await this.promptService.getTutorPrompt(prompt);
  }

  async question() {}
}
