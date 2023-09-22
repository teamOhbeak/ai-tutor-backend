import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { DatabaseModule } from '../database/database.module';
import { InterviewService } from './service/interview.service';
import { InterviewRepositoryImpl } from './repository/interview.repository';
import { InterviewController } from '@/interface/interview/interview.controller';
import { PromptService } from '../prompt/service/prompt.service';
import { QuestionBankRepository } from '../questionsBank/repository/questionsBank.repository';
import { AuthService } from '../auth/service/auth.service';
import { InterviewQuestionsServiceImpl } from '../interviewQuestions/service/interviewQuestions.service';
import { InterviewQuestionsModule } from '../interviewQuestions/interviewQuestions.module';
import { InterviewQuestionsRepositoryImpl } from '../interviewQuestions/repository/interviewQuestion.repository.interface';
import { InterviewAnswersRepository } from '../interviewAnswer/repository/interviewAnswer.repository.interface';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewController, InterviewQnaController],
  providers: [
    AuthService,
    InterviewService,
    InterviewRepositoryImpl,
    QuestionBankRepository,
    PromptService,
    InterviewQuestionsServiceImpl,
    InterviewQuestionsRepositoryImpl,
    InterviewAnswersRepository,
  ],
})
export class InterviewModule {}
