import { QnaResponse } from '@/interface/qna-room-qna/response/qna-response';
import { ApiProperty } from '@nestjs/swagger';

export class QnaRoomDetailResponse {
  @ApiProperty({ example: 1000 })
  id: number;

  @ApiProperty({ example: 'this is title' })
  title: string;

  @ApiProperty({ example: '2023-09-01 13:00' })
  createdAt: Date;

  @ApiProperty({ example: 'user1' })
  username: string;

  @ApiProperty({ type: [QnaResponse] })
  qnas: QnaResponse[] = [];

  constructor(
    id: number,
    title: string,
    createdAt: Date,
    username: string,
    qnas: QnaResponse[],
  ) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.username = username;
    this.qnas = qnas;
  }
}