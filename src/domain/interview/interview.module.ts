import { Module } from '@nestjs/common';
import { InterviewController } from 'src/interface/interview/interview.controller';

@Module({
  imports: [],
  controllers: [
    InterviewController
  ],
  providers: [],
})
export class InterviewModule {}
