import { ApiProperty } from '@nestjs/swagger';

export class CreateQnaRoomRequest {

  @ApiProperty({ example: '1000' })
  userId: number;

  @ApiProperty({ example: "this is title." })
  title: string;

  @ApiProperty({ example: '2023-09-01 13:00' })
  createdAt: string;

  constructor(userId: number, createdAt: string, title: string) {
    this.userId = userId;
    this.createdAt = createdAt;
    this.title = title;
  }
}