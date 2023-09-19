import { ApiProperty } from "@nestjs/swagger";
import { QuestionResponse } from "./question.response";

export class MyInterviewDetailResponse {

  @ApiProperty({ example: 1000 })
  id: number;

  @ApiProperty({ example: 'U' })
  status: string;

  // TODO: enum 선언되면 교체
  @ApiProperty({ example: 'java' })
  stack: string;

  @ApiProperty()
  questionCount: number;

  @ApiProperty({ example: 10.0 })
  maxWait: number; 

  @ApiProperty({ example: '2023-09-01 13:00' })
  createdAt: string;

  @ApiProperty({ type: [QuestionResponse]})
  questions: QuestionResponse[] = [];

  @ApiProperty()
  userId: number;

  constructor(id: number, status: string, createdAt: string, questions: QuestionResponse[]) {
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
    this.questions = questions;
  }
}


