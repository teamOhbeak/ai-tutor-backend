import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { InterviewController } from 'src/interface/interview/interview.controller';
import { FakeInterviewService } from 'src/domain/interview/service/fake-interview.service';

@Module({
  imports: [],
  controllers: [
    InterviewController,
    InterviewQnaController,
  ],
  providers: [
    FakeInterviewService
  ],
})
export class InterviewModule {}
