import { Module } from '@nestjs/common';
import { QuestionsBankService } from './service/questionsBank.service';
import { PromptService } from '../prompt/service/prompt.service';
@Module({
  imports: [],
  controllers: [],
  providers: [QuestionsBankService, PromptService],
})
export class QuestionsBankModule {}
