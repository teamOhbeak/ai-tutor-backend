import { Module } from '@nestjs/common';
import { QnaRoomController } from '@/interface/qna-room/qna-room.controller';
import { DatabaseModule } from '../database/database.module';
import { QnaRoomService } from './service/qna-room.service';
import { QnaRoomRepository } from './repository/qna-room-repository';
@Module({
  imports: [DatabaseModule],
  controllers: [QnaRoomController],
  providers: [QnaRoomService, QnaRoomRepository],
  exports: [QnaRoomRepository],
})
export class QnaRoomModule {}
