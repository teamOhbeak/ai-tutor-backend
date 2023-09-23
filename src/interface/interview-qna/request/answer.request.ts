import { ApiProperty } from '@nestjs/swagger';

export class AnswerRequest {
  @ApiProperty()
  answerText: string;
}
