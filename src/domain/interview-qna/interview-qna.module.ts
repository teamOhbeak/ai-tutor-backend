import { Module } from '@nestjs/common';
import { DatabaseModule } from "../database/database.module";
import { InterviewQnaController } from '@/interface/interview-qna/interview-qna.controller';
import { AuthService } from '../auth/service/auth.service';
import { InterviewQuestionService } from '../interview-question/service/interview-question.service';
import { InterviewQuestionRepository } from '../interview-question/repository/interview-question.repository';
import { FakeQuestionBankService } from '../questionsBank/service/fake-questionBank.service';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewQnaController],
  providers: [
    AuthService,
    InterviewQuestionService,
    InterviewQuestionRepository,
    FakeQuestionBankService,
  ],
})
export class InterviewQnaModule {}