import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QnaResponse } from './response/qna-response';
import { CreateQuestionRequest } from './request/create-question-request';
import { QnaService } from '@/domain/qna/service/qna.service';

@Controller('api/qna-rooms/:roomId/questions')
@ApiTags('QnaRoomQnaController')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Post()
  @ApiCreatedResponse({
    description: '질문 생성',
    type: QnaResponse,
  })
  async createQuestion(
    @Body() request: CreateQuestionRequest,
  ): Promise<QnaResponse> {
    return this.qnaService.createQna(request);
  }

  @Get()
  @ApiOkResponse({
    description: '질문 목록 조회',
    type: [QnaResponse],
  })
  async getQuestions(@Param('roomId') roomId: number): Promise<QnaResponse[]> {
    return this.qnaService.getQnas(roomId);
  }
}
