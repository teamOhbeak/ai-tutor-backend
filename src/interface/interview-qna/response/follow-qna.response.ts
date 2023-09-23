import { ApiProperty } from '@nestjs/swagger';
import { QuestionStatus } from '../../../domain/interview-question/entity/question-status.enum';

export class FollowUpQnaResponse {
  @ApiProperty()
  questionId: number;

  @ApiProperty()
  interviewId: number;

  @ApiProperty()
  questionText: string;

  @ApiProperty()
  answerText: string;

  @ApiProperty()
  status: QuestionStatus;

  @ApiProperty()
  isPass: number;

  @ApiProperty()
  mainQuestionId: number;

  @ApiProperty()
  startedAt: Date;

  @ApiProperty()
  finishedAt: Date;
}
