import { Module } from '@nestjs/common';
import { PromptService } from '../prompt/service/prompt.service';
import { DatabaseModule } from '../database/database.module';
import { InterviewQuestionService } from '@/domain/interview-question/service/interview-question.service';
import { QuestionBankService } from '../questionsBank/service/questionBank.service';
import { QuestionBankRepository } from '../questionsBank/repository/questionsBank.repository';
import { InterviewQuestionAndAnswerRepository } from './repository/interview-question-and-answer.repository';
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    InterviewQuestionService,
    QuestionBankService,
    PromptService,
    QuestionBankRepository,
    InterviewQuestionAndAnswerRepository,
  ],
})
export class InterviewQuestionModule {}
