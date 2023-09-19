import { Module } from '@nestjs/common';
import { QnaRoomController } from 'src/interface/qna/qna-room.controller';
@Module({
  imports: [],
  controllers: [
    QnaRoomController
  ],
  providers: [],
})
export class QnaRoomModule {}