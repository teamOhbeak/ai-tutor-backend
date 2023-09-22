import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { InterviewController } from 'src/interface/interview/interview.controller';
import { DatabaseModule } from '../database/database.module';
import { InterviewQuestionsServiceImpl } from './service/interviewQuestions.service';
import { InterviewQuestionsRepositoryImpl } from './repository/interviewQuestion.repository.interface';
import { PromptService } from '../prompt/service/prompt.service';
import { InterviewAnswersRepository } from '../interviewAnswer/repository/interviewAnswer.repository.interface';
import { InterviewEntity } from '../interview/entity/interview.entity';
import { InterviewAnswerModule } from '../interviewAnswer/interviewAnswer.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewController, InterviewQnaController],
  providers: [
    InterviewQuestionsServiceImpl,
    InterviewQuestionsRepositoryImpl,
    InterviewAnswersRepository,
    PromptService],
})
export class InterviewQuestionsModule {}
