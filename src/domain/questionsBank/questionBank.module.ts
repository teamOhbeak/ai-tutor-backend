import { Module } from '@nestjs/common';
import { QuestionBankService } from './service/questionBank.service';
import { PromptService } from '../prompt/service/prompt.service';
import { QuestionBankRepository } from './repository/questionsBank.repository';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [QuestionBankService, PromptService, QuestionBankRepository],
})
export class QuestionBankModule {}
