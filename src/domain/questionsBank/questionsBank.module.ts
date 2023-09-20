import { Module } from '@nestjs/common';
import { QuestionsBankService } from './service/questionsBank.service';
import { PromptService } from '../prompt/service/prompt.service';
import { questionCollectorService } from '../batch/questionCollector.service';
@Module({
  imports: [],
  controllers: [],
  providers: [QuestionsBankService, PromptService, questionCollectorService],
})
export class QuestionsBankModule {}
