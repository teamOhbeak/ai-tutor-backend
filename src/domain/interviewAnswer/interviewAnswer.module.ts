import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { InterviewController } from 'src/interface/interview/interview.controller';
import { DatabaseModule } from '../database/database.module';
import { InterviewQuestionsServiceImpl } from '../interviewQuestions/service/interviewQuestions.service';
import { InterviewAnswersRepository } from './repository/interviewAnswer.repository.interface';
import { AuthService } from '../auth/service/auth.service';
import { InterviewService } from '../interview/service/interview.service';
import { QuestionBankRepository } from '../questionsBank/repository/questionsBank.repository';
import { PromptService } from '../prompt/service/prompt.service';
import { InterviewQuestionsRepositoryImpl } from '../interviewQuestions/repository/interviewQuestion.repository';
import { FollowUpQuestionsRepositoryImpl } from '../followUpQuestions/repository/followUpQuestions.repository';
import { FollowUpAnswerRepositoryImpl } from '../followUpAnswer/repository/followUpAnswer.repository';
import { InterviewRepository } from '../interview/repository/interview.repository';
import { InterviewQuestionService } from '../interview-question/service/interview-question.service';
import { InterviewQuestionRepository } from '../interview-question/repository/interview-question.repository';
import { InterviewFacade } from '../interview/service/interview.facade';

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
    PromptService,
    FollowUpAnswerRepositoryImpl,
    InterviewFacade,
    InterviewQuestionService,
    InterviewQuestionRepository,
  ],
})
export class InterviewAnswerModule {}
