import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { InterviewController } from 'src/interface/interview/interview.controller';
import { DatabaseModule } from '../database/database.module';
import { InterviewQuestionsServiceImpl } from './service/interviewQuestions.service';
import { InterviewQuestionsRepositoryImpl } from './repository/interviewQuestion.repository';
import { PromptService } from '../prompt/service/prompt.service';
import { InterviewAnswersRepository } from '../interviewAnswer/repository/interviewAnswer.repository.interface';
import { InterviewEntity } from '../interview/entity/interview.entity';
import { InterviewAnswerModule } from '../interviewAnswer/interviewAnswer.module';
import { AuthService } from '../auth/service/auth.service';
import { InterviewService } from '../interview/service/interview.service';
import { InterviewRepositoryImpl } from '../interview/repository/interview.repository';
import { QuestionBankRepository } from '../questionsBank/repository/questionsBank.repository';
import { FollowUpQuestionsRepositoryImpl } from '../followUpQuestions/repository/followUpQuestions.repository';
import { FollowUpQuestionsModule } from '../followUpQuestions/followUpQuestions.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewController, InterviewQnaController],
  providers: [
    AuthService,
    InterviewService,
    InterviewRepositoryImpl,
    InterviewQuestionsServiceImpl,
    InterviewQuestionsRepositoryImpl,
    InterviewAnswersRepository,
    PromptService,
    QuestionBankRepository,
    FollowUpQuestionsRepositoryImpl,
  ],
})
export class InterviewQuestionsModule {}
