import { ApiProperty } from '@nestjs/swagger';

export class CreateInterviewRequest {
  @ApiProperty()
  stack: string;

  @ApiProperty()
  questionCount: number;

  @ApiProperty()
  maxWait: number;
}
