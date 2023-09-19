import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller('api/qna-rooms/:roomId/questions')
@ApiTags('QnaRoomQnaController')
export class QnaRoomQnaController {
  
  constructor() { }
}