import { Module } from '@nestjs/common';
import { QnaController } from '@/interface/qna-room-qna/qna.controller';
import { QnaRoomController } from '@/interface/qna-room/qna-room.controller';
import { DatabaseModule } from '../database/database.module';
import { QnaRoomService } from './service/qna-room.service';
import { QnaRoom } from './qna-room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qna } from '../qna/qna.entity';
import { QnaRoomRepository } from './repository/qna-room-repository';
@Module({
  imports: [DatabaseModule],
  // imports: [TypeOrmModule.forFeature([QnaRoom])],
  controllers: [QnaRoomController],
  providers: [QnaRoomService, QnaRoomRepository],
  exports: [QnaRoomRepository],
})
export class QnaRoomModule { }
