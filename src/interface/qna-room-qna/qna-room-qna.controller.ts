import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@Controller('api/qna-rooms/:roomId/questions')
@ApiTags('QnaRoomQnaController')
export class QnaRoomQnaController {
  
  constructor() { }

  @Post()
  @ApiCreatedResponse()
  async createQuestion(
    @Param('roomId') roomId: number, 
    @Body() params: any)
  : Promise<any> {

    return {id: 'questionId', contents: ''};
  }

  @Get()
  @ApiOkResponse()
  async getQuestions(
    @Param('roomId') roomId: number)
  : Promise<any> {
    
    return [];
  }
}