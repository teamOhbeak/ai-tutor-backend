import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { InterviewController } from 'src/interface/interview/interview.controller';
import { FakeInterviewService } from 'src/domain/interview/service/fake-interview.service';
import { DatabaseModule } from '../database/database.module';
import { InterviewQuestionsServiceImpl } from '../interviewQuestions/service/interviewQuestions.service';
import { InterviewQuestionsModule } from '../interviewQuestions/interviewQuestions.module';
import { InterviewAnswersRepository } from './repository/interviewAnswer.repository.interface';

@Module({
  imports: [DatabaseModule, InterviewQuestionsModule],
  controllers: [InterviewController, InterviewQnaController],
  providers: [InterviewAnswersRepository],
})
export class InterviewAnswerModule {}
