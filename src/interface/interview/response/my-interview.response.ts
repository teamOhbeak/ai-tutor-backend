import { InterviewStatus } from '@/domain/interview/entity/insterview-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class MyInterviewResponse {
  @ApiProperty({ example: 1000 })
  id: number;

  @ApiProperty({ example: InterviewStatus.DONE })
  status: InterviewStatus;

  @ApiProperty({ example: '작성자' })
  userName: string;

  @ApiProperty({ example: '2023-09-01 13:00' })
  createdAt: string;

  @ApiProperty({ example: '2023-09-01 13:00' })
  finishedAt: string;

  @ApiProperty({ example: 0 })
  userId: number;

  constructor(
    id: number,
    status: InterviewStatus,
    createdAt: string,
    finishedAt: string,
    userId: number,
    userName: string,
  ) {
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
    this.userId = userId;
    this.userName = userName;
  }
}
