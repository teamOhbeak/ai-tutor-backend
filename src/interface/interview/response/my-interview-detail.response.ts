import { ApiProperty } from '@nestjs/swagger';
import { QuestionResponse } from './question.response';
import { Stack } from '@/domain/interview/service/interview.model';
import { StackType } from '@/domain/interview/entity/interview.entity';

export enum InterviewStatus {
  COMPLETED = 0,
  IN_PROGRESS = 1,
  WAITING = 2,
  CANCELED = 3,
  EXPIRED = 4,
  NO_SHOW = 5,
}

export class MyInterviewDetailResponse {
  @ApiProperty({ example: 1000 })
  id: number;

  @ApiProperty({ example: 'U', enum: InterviewStatus })
  status: InterviewStatus;

  @ApiProperty({ example: 'java' })
  stack: StackType;

  @ApiProperty()
  questionCount: number;

  @ApiProperty({ example: 10.0 })
  maxWait: number;

  @ApiProperty({ example: '2023-09-01 13:00' })
  createdAt: string;

  @ApiProperty({ type: [QuestionResponse] })
  questions: QuestionResponse[] = [];

  @ApiProperty()
  userId: number;

  constructor(
    id: number,
    status: InterviewStatus,
    createdAt: string,
    questions: QuestionResponse[],
  ) {
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
    this.questions = questions;
  }
}
