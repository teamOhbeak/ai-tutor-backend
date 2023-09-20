import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionRoomRequest {
  @ApiProperty({ example: '1000' })
  questionRoomId: number;

  @ApiProperty({ example: 'this is title.' })
  question: string;

  constructor(questionRoomId: number, question: string) {
    this.questionRoomId = questionRoomId;
    this.question = question;
  }
}
