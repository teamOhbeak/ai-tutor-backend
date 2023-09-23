import { ApiProperty } from '@nestjs/swagger';
import { FollowUpQnaResponse } from './follow-qna.response';
import { QuestionStatus } from '../../../domain/interview-question/entity/question-status.enum';

export class MainQnaResponse {
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

  //TODO: -> 근아님 협의 계층구조 필요없다고하면, 제거
  @ApiProperty()
  followUpQuestions: FollowUpQnaResponse[];
}
