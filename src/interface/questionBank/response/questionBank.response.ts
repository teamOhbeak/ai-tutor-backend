import { ApiProperty, PickType } from '@nestjs/swagger';
import { StacktType } from '../../interview/response/my-interview-detail.response';
import { QuestionStatus } from '../../../domain/questionsBank/entity/questionBank.entity';

export class QuestionBankResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  stack: StacktType;

  @ApiProperty()
  question: string;

  @ApiProperty()
  status: QuestionStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(
    id: number,
    stack: StacktType,
    question: string,
    status: QuestionStatus,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.stack = stack;
    this.question = question;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class CreateQuestionBankResponse extends PickType(QuestionBankResponse, [
  'stack',
  'question',
  'status',
] as const) {}
