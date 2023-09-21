import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';


export class CreateQnaRoomRequest {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  constructor(userId: number, title: string) {
    this.userId = userId;
    this.title = title;
  }
}
