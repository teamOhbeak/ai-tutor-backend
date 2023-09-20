import { Stack } from '@/domain/interview/service/interview.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInterviewRequest {
  @ApiProperty()
  stack: Stack;

  @ApiProperty()
  questionCount: number;

  @ApiProperty()
  maxWait: number;
}
