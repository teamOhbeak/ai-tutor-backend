import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/qna-rooms')
@ApiTags('QnaRoomController')
export class QnaRoomController {
  constructor() {}

  @Post()
  @ApiCreatedResponse()
  async createQnaRooms(): Promise<any> {}

  @Get()
  @ApiOkResponse()
  async getQnaRooms(): Promise<any[]> {
    return [];
  }

  @Get(':id')
  @ApiOkResponse()
  async getQnaRoomDetail(): Promise<any> {
    return {};
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteQnaRoom(@Param('id') roomId: number): Promise<any> {
    return {};
  }
}
