import { Module } from '@nestjs/common';
import { QnaRoomQnaController } from 'src/interface/qna-room-qna/qna-room-qna.controller';
import { QnaRoomController } from '@/interface/qna-room/QnaRoomController';
@Module({
  imports: [],
  controllers: [QnaRoomController, QnaRoomQnaController],
  providers: [],
})
export class QnaRoomModule {}
