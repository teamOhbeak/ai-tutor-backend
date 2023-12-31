import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { DatabaseModule } from '../database/database.module';
import { InterviewService } from './service/interview.service';
import { InterviewRepository as InterviewRepository } from './repository/interview.repository';
import { InterviewController } from '@/interface/interview/interview.controller';
import { AuthService } from '../auth/service/auth.service';
import { InterviewQuestionService } from '../interview-question/service/interview-question.service';
import { InterviewQuestionRepository } from '../interview-question/repository/interview-question.repository';
import { InterviewFacade } from './service/interview.facade';
import { FakeQuestionBankService } from '../questionsBank/service/fake-questionBank.service';
import { QuestionBankService } from '../questionsBank/service/questionBank.service';
import { PromptService } from '../prompt/service/prompt.service';
import { QuestionBankRepository } from '../questionsBank/repository/questionsBank.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewController],
  providers: [
    AuthService,
    InterviewService,
    InterviewRepository,
    InterviewQuestionService,
    InterviewQuestionRepository,
    FakeQuestionBankService,
    InterviewFacade,
    QuestionBankService,
    PromptService,
    QuestionBankRepository,
  ],
})
export class InterviewModule {}
