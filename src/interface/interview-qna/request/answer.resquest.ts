import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum QuestionType {
  MAIN = 'MAIN',
  FOLLOWUP = 'FOLLOWUP',
}

export class AnswerRequestDto {
  @IsString()
  @IsNotEmpty()
  questionType: QuestionType;
  @IsInt()
  @IsOptional()
  interviewQuestionId?: number; // 선택적 프로퍼티
  @IsInt()
  @IsOptional()
  followUpQuestionId?: number; // 선택적 프로퍼티
  @IsString()
  @IsNotEmpty()
  answer: string;
}
