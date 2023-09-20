import { ApiProperty } from '@nestjs/swagger';
import { QuestionResponse } from './question.response';
import { Stack } from '@/domain/interview/service/interview.model';

export class MyInterviewDetailResponse {
  @ApiProperty({ example: 1000 })
  id: number;

  @ApiProperty({ example: 'U' })
  status: string;

  @ApiProperty({ example: 'java' })
  stack: Stack;

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
    status: string,
    createdAt: string,
    questions: QuestionResponse[],
  ) {
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
    this.questions = questions;
  }
}
