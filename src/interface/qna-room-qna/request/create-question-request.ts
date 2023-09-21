import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionRequest {
  @ApiProperty({ example: '1000' })
  roomId: number;

  @ApiProperty({ example: 'this is qusetion.' })
  question: string;

  constructor(roomId: number, question: string) {
    this.roomId = roomId;
    this.question = question;
  }
}
