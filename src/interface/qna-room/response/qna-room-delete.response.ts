import { ApiProperty } from '@nestjs/swagger';

export class QnaRoomDeleteResponse {
  @ApiProperty({ example: 1000 })
  id: number;

  @ApiProperty({ example: 'this is title' })
  deleted: boolean;

  constructor(id: number, deleted: boolean) {
    this.id = id;
    this.deleted = deleted;
  }
}
