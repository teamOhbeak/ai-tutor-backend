import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { DatabaseModule } from '../database/database.module';
import { InterviewService } from './service/interview.service';
import { InterviewRepository as InterviewRepository } from './repository/interview.repository';
import { InterviewController } from '@/interface/interview/interview.controller';
import { AuthService } from '../auth/service/auth.service';
import { InterviewQuestionsServiceImpl } from '../interviewQuestions/service/interviewQuestions.service';
import { InterviewQuestionsRepositoryImpl } from '../interviewQuestions/repository/interviewQuestion.repository';
import { InterviewAnswersRepository } from '../interviewAnswer/repository/interviewAnswer.repository.interface';
import { FollowUpQuestionsRepositoryImpl } from '../followUpQuestions/repository/followUpQuestions.repository';
import { FollowUpAnswerRepositoryImpl } from '../followUpAnswer/repository/followUpAnswer.repository';
import { InterviewQuestionService } from '../interview-question/service/interview-question.service';
import { InterviewQuestionRepository } from '../interview-question/repository/interview-question.repository';
import { InterviewFacade } from './service/interview.facade';
import { FakeQuestionBankService } from '../questionsBank/service/fake-questionBank.service';
import { QuestionBankRepository } from '../questionsBank/repository/questionsBank.repository';
import { PromptService } from '../prompt/service/prompt.service';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewController, InterviewQnaController],
  providers: [
    AuthService,
    InterviewService,
    InterviewRepository,
    QuestionBankRepository,
    FollowUpQuestionsRepositoryImpl,
    PromptService,
    InterviewQuestionsServiceImpl,
    InterviewQuestionsRepositoryImpl,
    InterviewAnswersRepository,
    FollowUpAnswerRepositoryImpl,
    InterviewRepository,
    InterviewQuestionService,
    InterviewQuestionRepository,
    FakeQuestionBankService,
    InterviewFacade,
  ],
})
export class InterviewModule {}
