import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StackType } from '@/domain/interview/entity/stack-type.enum';
export class CreateInterviewRequest {
  @ApiProperty({ enum: StackType, example: StackType.JAVA })
  @IsEnum(StackType) // Stack 열거형 값 중 하나여야 합니다.
  stack: StackType;

  @ApiProperty({ example: 10 })
  @IsInt()
  @IsNotEmpty()
  questionCount: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  @IsNotEmpty()
  maxWait: number; 
}
