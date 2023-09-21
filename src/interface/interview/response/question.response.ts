import { ApiProperty } from '@nestjs/swagger';
import { AnswerResponse } from './answer.response';

export enum QuestionStatus {
  COMPLETED = 0,
  IN_PROGRESS = 1,
  WAITING = 2,
  CANCELED = 3,
}

export enum QuestionType {
  MAIN_QUESTION = 0,
  FOLLOWUP_QUESTION = 1,
  SUB_QUESTION = 2,
}

export class QuestionResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: QuestionType;

  @ApiProperty()
  question: string;

  @ApiProperty()
  status: QuestionStatus; //답변 대기, 답변 완료

  @ApiProperty()
  startedAt: string;

  @ApiProperty()
  finishedAt: string;

  @ApiProperty({ type: [QuestionResponse] })
  followUpQuestions?: QuestionResponse[];

  @ApiProperty()
  answer?: AnswerResponse | null;

  @ApiProperty()
  createdAt: string;

  constructor(answer?: AnswerResponse) {
    this.answer = answer;
  }
}
