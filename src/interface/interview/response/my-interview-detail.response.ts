import { ApiProperty } from '@nestjs/swagger';
import { StackType } from '@/domain/interview/entity/stack-type.enum';
import { InterviewStatus } from '@/domain/interview/entity/insterview-status.enum';
import { InterviewQuestionResponse } from '@/interface/interview-qna/response/interview-question.response';
export class MyInterviewDetailResponse {
  @ApiProperty({ example: 1000 })
  id: number;

  @ApiProperty({ example: InterviewStatus.DONE, enum: InterviewStatus })
  status: InterviewStatus;

  @ApiProperty({ example: 'java' })
  stack: StackType;

  @ApiProperty()
  questionCount: number;

  @ApiProperty({ example: 10.0 })
  maxWait: number;

  @ApiProperty({ example: '2023-09-01 13:00' })
  createdAt: string;

  @ApiProperty({ type: [InterviewQuestionResponse] })
  questions: InterviewQuestionResponse[] = [];

  @ApiProperty()
  userId: number;

  @ApiProperty()
  userName: string;

  constructor() {
    // user: UserResponse, // questions: QuestionResponse[], // createdAt: string, // status: InterviewStatus, // id: number,
    // this.id = id;
    // this.status = status;
    // this.createdAt = createdAt;
    // this.questions = questions;
    // this.userName = user.userName;
  }
}
