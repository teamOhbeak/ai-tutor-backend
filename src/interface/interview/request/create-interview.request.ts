import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Stack } from '@/domain/interview/service/interview.model';
import { StackType } from '@/domain/interview/entity/interview.entity';

export class CreateInterviewRequest {
  @ApiProperty({ enum: Stack, example: Stack.Java })
  @IsEnum(Stack) // Stack 열거형 값 중 하나여야 합니다.
  stack: StackType;

  @ApiProperty({ example: 10 })
  @IsInt() // 정수여야 합니다.
  @IsNotEmpty() // 비어 있으면 안됩니다.
  questionCount: number;

  @ApiProperty({ example: 3 })
  @IsInt() // 정수여야 합니다.
  @IsNotEmpty() // 비어 있으면 안됩니다.
  maxWait: number;
}
