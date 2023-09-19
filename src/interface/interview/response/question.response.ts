import { ApiProperty } from "@nestjs/swagger";
import { AnswerResponse } from "./answer.response";

export class QuestionResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  status: string; //답변 대기, 답변 완료

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