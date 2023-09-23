import { ApiProperty } from '@nestjs/swagger';
import { InterviewStatus } from '../../../domain/interview/entity/insterview-status.enum';
import { QuestionStatus } from '../../../domain/interview-question/entity/question-status.enum';

export class QuestionInfo {
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

  // @ApiProperty()
  // isPass: number;

  @ApiProperty()
  mainQuestionId: number;

  @ApiProperty()
  startedAt: Date;

  @ApiProperty()
  finishedAt: Date;
}

export class NextQuestionResponse {
  @ApiProperty()
  interviewStatus: InterviewStatus;

  @ApiProperty()
  question?: QuestionInfo | null;
}
