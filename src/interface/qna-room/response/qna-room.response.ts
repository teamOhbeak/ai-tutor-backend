import { ApiProperty } from '@nestjs/swagger';

export class QnaRoomResponse {
  @ApiProperty({ example: 1000 })
  id: number;

  @ApiProperty({ example: 'this is title' })
  title: string;

  @ApiProperty({ example: '2023-09-01 13:00' })
  createdAt: Date;

  @ApiProperty({ example: 'user1' })
  username: string;

  constructor(id: number, title: string, createdAt: Date, username: string) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.username = username;
  }
}
