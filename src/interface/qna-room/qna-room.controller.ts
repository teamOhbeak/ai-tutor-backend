import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QnaRoomResponse } from './response/qna-room.response';
import { CreateQnaRoomRequest } from './request/create-qna-room.request';
import { QnaRoomService } from '@/domain/qna-room/service/qna-room.service';
import { QnaRoomDetailResponse } from './response/qna-room-detail.response';
import { QnaRoomDeleteResponse } from './response/qna-room-delete.response';

@Controller('api/qna-rooms')
@ApiTags('QnaRoomController')
export class QnaRoomController {
  constructor(private readonly qnaRoomService: QnaRoomService) { }

  @Post()
  @ApiCreatedResponse({
    description: '질문방 생성',
    type: QnaRoomResponse,
  })
  async createQnaRooms(
    @Body() createQnaRoomRequest: CreateQnaRoomRequest,
  ): Promise<QnaRoomResponse> {
    return this.qnaRoomService.createQnaRoom(createQnaRoomRequest);
  }

  @Get()
  @ApiOkResponse({
    description: '질문방 리스트 조회',
    type: [QnaRoomResponse],
  })
  async getQnaRooms(): Promise<QnaRoomResponse[]> {
    return this.qnaRoomService.getQnaRooms();
  }

  @Get(':id')
  @ApiOkResponse({
    description: '질문방 상세조회',
    type: QnaRoomDetailResponse,
  })
  async getQnaRoomDetail(
    @Param('id') id: number,
  ): Promise<QnaRoomDetailResponse> {
    return this.qnaRoomService.getQnaRoomDetail(id);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: '질문방 삭제',
    type: QnaRoomDeleteResponse,
  })
  async deleteQnaRoom(
    @Param('id') roomId: number,
  ): Promise<QnaRoomDeleteResponse> {
    return this.qnaRoomService.deleteQnaRoom(roomId);
  }
}
