import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { QnaController } from '@/interface/qna-room-qna/qna.controller';
import { QnaService } from '@/domain/qna/service/qna.service';
import { QnaRepository } from './repository/qna-repository';
import { QnaRoomRepository } from '../qna-room/repository/qna-room-repository';

@Module({
  imports: [DatabaseModule],
  controllers: [QnaController],
  providers: [QnaService, QnaRepository, QnaRoomRepository],
  exports: [QnaRepository],
})
export class QnaModule { }
