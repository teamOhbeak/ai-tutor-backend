import { ApiProperty } from '@nestjs/swagger';
import { QuestionStatus } from '../../../domain/interview-question/entity/question-status.enum';
import { QuestionInfo } from './next-question.response';

export class QuestionStateResponse {
  @ApiProperty()
  status: QuestionStatus;

  @ApiProperty()
  question?: QuestionInfo | null;
}
