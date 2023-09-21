import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { PromptService } from '../prompt/service/prompt.service';

@Injectable()
export class BatchService {
  constructor(private readonly promptService: PromptService) { }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async questionCollector() {
    const promptResult = await this.promptService.getInterviewQuestionsPrompt();
  }
}
