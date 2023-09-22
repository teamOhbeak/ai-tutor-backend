import { InterviewStatus } from "@/domain/interview/entity/insterview-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CanceledInterviewResponse {
  @ApiProperty({description: '취소된 인터뷰id'})
  id: number;

  @ApiProperty({description: '상태'})
  status: InterviewStatus;

  constructor(interviewId: number, status: InterviewStatus) {
    this.id = interviewId;
    this.status = status;
  }
}