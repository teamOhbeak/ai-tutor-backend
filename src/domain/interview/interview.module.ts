import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { DatabaseModule } from '../database/database.module';
import { InterviewService } from './service/interview.service';
import { InterviewRepositoryImpl as InterviewRepository } from './repository/interview.repository';
import { InterviewController } from '@/interface/interview/interview.controller';
import { PromptService } from '../prompt/service/prompt.service';
import { QuestionBankRepository } from '../questionsBank/repository/questionsBank.repository';
import { AuthService } from '../auth/service/auth.service';
import { InterviewQuestionService } from '../interview-question/service/interview-question.service';
import { InterviewQuestionRepository } from '../interview-question/repository/interview-question.repository';
import { InterviewFacade } from './service/interview.facade';
import { QuestionBankService } from '../questionsBank/service/questionBank.service';
import { FakeQuestionBankService } from '../questionsBank/service/fake-questionBank.service';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewController, InterviewQnaController],
  providers: [
    AuthService,
    InterviewService,
    InterviewRepository,
    InterviewQuestionService,
    InterviewQuestionRepository,
    FakeQuestionBankService,
    InterviewFacade,
  ],
})
export class InterviewModule {}
