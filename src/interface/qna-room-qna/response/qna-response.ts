import { ApiProperty } from '@nestjs/swagger';

export class QnaResponse {
  @ApiProperty({ example: '1000' })
  id: number;

  @ApiProperty({ example: 1 })
  sequence: number;

  @ApiProperty({ example: 'this is question.' })
  question: string;

  @ApiProperty({ example: 'this is answer.' })
  answer: string;

  constructor(
    qnaId: number,
    sequence: number,
    question: string,
    answer: string,
  ) {
    this.id = qnaId;
    this.sequence = sequence;
    this.question = question;
    this.answer = answer;
  }
}
