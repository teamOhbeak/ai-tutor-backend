import { Module } from '@nestjs/common';
import { QnaRoomController } from 'src/interface/qna-room/qna-room.controller';
@Module({
  imports: [],
  controllers: [
    QnaRoomController
  ],
  providers: [],
})
export class QnaRoomModule {}