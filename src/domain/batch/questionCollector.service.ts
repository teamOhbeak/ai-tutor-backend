import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { PromptService } from '../prompt/service/prompt.service';

@Injectable()
export class questionCollectorService {
  constructor() {}

  //TODO: 매일 자정에 실행되도록 설정
  // GPT에게 물어보던지 아니면 크롤링을 하던지
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async questionCollector() {
    console.log('questionCollector');
  }

  async questionCrawler() {}
}
