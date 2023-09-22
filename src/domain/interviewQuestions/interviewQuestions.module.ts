import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { InterviewController } from 'src/interface/interview/interview.controller';
import { DatabaseModule } from '../database/database.module';
import { InterviewQuestionsServiceImpl } from './service/interviewQuestions.service';
import { InterviewQuestionsRepositoryImpl } from './repository/interviewQuestion.repository';
import { PromptService } from '../prompt/service/prompt.service';
import { InterviewAnswersRepository } from '../interviewAnswer/repository/interviewAnswer.repository.interface';
import { AuthService } from '../auth/service/auth.service';
import { InterviewService } from '../interview/service/interview.service';
import { QuestionBankRepository } from '../questionsBank/repository/questionsBank.repository';
import { FollowUpQuestionsRepositoryImpl } from '../followUpQuestions/repository/followUpQuestions.repository';
import { FollowUpAnswerRepositoryImpl } from '../followUpAnswer/repository/followUpAnswer.repository';
import { InterviewRepository } from '../interview/repository/interview.repository';
import { InterviewFacade } from '../interview/service/interview.facade';
import { FakeQuestionBankService } from '../questionsBank/service/fake-questionBank.service';
import { InterviewQuestionService } from '../interview-question/service/interview-question.service';
import { InterviewQuestionRepository } from '../interview-question/repository/interview-question.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewController, InterviewQnaController],
  providers: [
    AuthService,
    InterviewService,
    InterviewRepository,
    InterviewQuestionsServiceImpl,
    InterviewQuestionsRepositoryImpl,
    InterviewAnswersRepository,
    PromptService,
    QuestionBankRepository,
    FollowUpQuestionsRepositoryImpl,
    FollowUpAnswerRepositoryImpl,
    InterviewFacade,
    FakeQuestionBankService,
    InterviewQuestionService,
    InterviewQuestionRepository,
  ],
})
export class InterviewQuestionsModule {}
