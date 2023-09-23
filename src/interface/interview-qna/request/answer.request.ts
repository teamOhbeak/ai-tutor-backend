import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AnswerRequest {
  @ApiProperty()
  @IsOptional()
  answerText: string;
}
