import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, isInt } from 'class-validator';

export class CreateQuestionRequest {
  @ApiProperty({ example: '1000' })
  @IsInt()
  roomId: number;

  @ApiProperty({ example: 'this is qusetion.' })
  @IsString()
  question: string;

  constructor(roomId: number, question: string) {
    this.roomId = roomId;
    this.question = question;
  }
}
