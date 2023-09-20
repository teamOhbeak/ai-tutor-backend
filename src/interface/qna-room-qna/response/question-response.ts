import { ApiProperty } from '@nestjs/swagger';

export class QnaResponse {
  @ApiProperty({ example: '1000' })
  qnaId: number;

  @ApiProperty({ example: 1 })
  sequence: number;

  @ApiProperty({ example: 'this is question.' })
  question: string;

  @ApiProperty({ example: 'this is answer.' })
  answer: string;

  constructor(qnaId: number, question: string, answer: string) {
    this.qnaId = qnaId;
    this.question = question;
    this.answer = answer;
  }
}
