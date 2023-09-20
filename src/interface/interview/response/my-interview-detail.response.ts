import { ApiProperty } from '@nestjs/swagger';
import { QuestionResponse } from './question.response';

export enum InterviewStatus {
  COMPLETED = 0,
  IN_PROGRESS = 1,
  WAITING = 2,
  CANCELED = 3,
  EXPIRED = 4,
  NO_SHOW = 5,
}

export enum StacktType {
  JAVA = 0,
  JAVASCRIPT = 1,
  KOTLIN = 2,
  REACTJS = 3,
  NEXTJS = 4,
  NODEJS = 5,
  NESTJS = 6,
  SPRING = 7,
  CS = 8,
}
export class MyInterviewDetailResponse {
  @ApiProperty({ example: 1000 })
  id: number;

  @ApiProperty({ example: 'U', enum: InterviewStatus })
  status: InterviewStatus;

  // TODO: enum 선언되면 교체
  @ApiProperty({ example: 'java' })
  stack: StacktType;

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
