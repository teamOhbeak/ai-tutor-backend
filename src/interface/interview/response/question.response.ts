import { ApiProperty } from "@nestjs/swagger";
import { AnswerResponse } from "./answer.response";

export class QuestionResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  answer?: AnswerResponse | null;

  @ApiProperty()
  status: string; //답변 대기, 답변 완료

  @ApiProperty({ type: [QuestionResponse] })
  followUpQuestion?: QuestionResponse[];

  @ApiProperty()
  cratedAt: string;

  constructor(answer?: AnswerResponse) {
    this.answer = answer;
  }
}