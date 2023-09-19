import { ApiProperty } from "@nestjs/swagger";

export class MyInterviewResponse {
  
  @ApiProperty({ example: 1000 })
  id: number;

  @ApiProperty({ example: 'U' })
  status: string;

  @ApiProperty({ example: '2023-09-01 13:00' })
  createdAt: string;

  constructor(id: number, status: string, createdAt: string) {
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
  }
}