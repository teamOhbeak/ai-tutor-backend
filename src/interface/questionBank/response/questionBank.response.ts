import { ApiProperty, PickType } from '@nestjs/swagger';
import { QuestionStatus } from '../../../domain/questionsBank/entity/questionBank.entity';
import { StackType } from '@/domain/interview/entity/stack-type.enum';

export class QuestionBankResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  stack: StackType;

  @ApiProperty()
  question: string;

  @ApiProperty()
  status: QuestionStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  // @ApiProperty()
  // record: boolean;

  constructor(
    id: number,
    stack: StackType,
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
