import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { InterviewController } from 'src/interface/interview/interview.controller';
import { DatabaseModule } from '../database/database.module';
import { InterviewQuestionsServiceImpl } from './service/interviewQuestions.service';
import { InterviewQuestionsRepositoryImpl } from './repository/interviewQuestion.repository.interface';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewController, InterviewQnaController],
  providers: [InterviewQuestionsServiceImpl, InterviewQuestionsRepositoryImpl],
})
export class InterviewQuestionsModule {}
