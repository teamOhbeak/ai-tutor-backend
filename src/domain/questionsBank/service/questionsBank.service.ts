import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { PromptService } from '../../prompt/service/prompt.service';

@Injectable()
export class QuestionsBankService {
  constructor(private readonly promptService: PromptService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async questionCollector() {}
}

export enum QuestionType {
  JAVA = 0,
  JAVASCRIPT = 1,
  KOTLIN = 2,
  REACTJS = 3,
  NEXTJS = 4,
  NODEJS = 5,
  NESTJS = 6,
  SPRING = 7,
  CS = 8,
}
