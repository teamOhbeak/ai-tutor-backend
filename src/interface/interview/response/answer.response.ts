import { ApiProperty } from "@nestjs/swagger";

export class AnswerResponse {
  @ApiProperty()
  contents: string;
  @ApiProperty()
  createdAt: string;
  
  constructor() {}
}

