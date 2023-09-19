import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

@Controller('api/qna-rooms')
@ApiTags('QnaRoomController')
export class QnaRoomController {

  constructor() {}

  @Get()
  @ApiOkResponse()
  async getQnaRooms()
  : Promise<any[]> {
    return [];
  }

  @Get(':id')
  @ApiOkResponse()
  async getQuaRoomDetail()
  : Promise<any> {
    return {};
  }
}
