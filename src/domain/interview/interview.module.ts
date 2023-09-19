import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { InterviewController } from 'src/interface/interview/interview.controller';

@Module({
  imports: [],
  controllers: [
    InterviewController,
    InterviewQnaController,
  ],
  providers: [],
})
export class InterviewModule {}
