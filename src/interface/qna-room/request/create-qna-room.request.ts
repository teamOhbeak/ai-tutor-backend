import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateQnaRoomRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  constructor(title: string) {
    this.title = title;
  }
}
