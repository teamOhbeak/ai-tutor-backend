import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { InterviewController } from 'src/interface/interview/interview.controller';
import { DatabaseModule } from '../database/database.module';
import { FollowUpQuestionsRepositoryImpl } from '../followUpQuestions/repository/followUpQuestions.repository';
import { InterviewService } from '../interview/service/interview.service';
import { AuthService } from '../auth/service/auth.service';
import { QuestionBankRepository } from '../questionsBank/repository/questionsBank.repository';
import { PromptService } from '../prompt/service/prompt.service';
import { InterviewQuestionsServiceImpl } from '../interviewQuestions/service/interviewQuestions.service';
import { InterviewQuestionsRepositoryImpl } from '../interviewQuestions/repository/interviewQuestion.repository';
import { InterviewAnswersRepository } from '../interviewAnswer/repository/interviewAnswer.repository.interface';
import { InterviewRepository } from '../interview/repository/interview.repository';
import { FollowUpAnswerRepositoryImpl } from './repository/followUpAnswer.repository';
import { InterviewFacade } from '../interview/service/interview.facade';
import { InterviewQuestionService } from '../interview-question/service/interview-question.service';
import { InterviewQuestionRepository } from '../interview-question/repository/interview-question.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewController, InterviewQnaController],
  providers: [
    AuthService,
    InterviewService,
    InterviewRepository,
    QuestionBankRepository,
    PromptService,
    InterviewQuestionsServiceImpl,
    InterviewQuestionsRepositoryImpl,
    InterviewAnswersRepository,
    FollowUpQuestionsRepositoryImpl,
    InterviewQuestionRepository,
    FollowUpAnswerRepositoryImpl,
    InterviewQuestionService,
    InterviewFacade,
    PromptService,
  ],
})
export class FollowUpAnswerModule {}
