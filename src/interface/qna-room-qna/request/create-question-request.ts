import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionRequest {
  @ApiProperty({ example: '1000' })
  @IsInt()
  @IsNotEmpty()
  roomId: number;

  @ApiProperty({ example: 'this is qusetion.' })
  @IsString()
  @IsNotEmpty()
  question: string;

  constructor(roomId: number, question: string) {
    this.roomId = roomId;
    this.question = question;
  }
}
