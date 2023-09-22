import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { QnaController } from '@/interface/qna-room-qna/qna.controller';
import { QnaService } from './service/qna.service';
import { QnaRepository } from './repository/qna-repository';
import { QnaRoomRepository } from '../qna-room/repository/qna-room-repository';
import { PromptService } from '../prompt/service/prompt.service';

@Module({
  imports: [DatabaseModule],
  controllers: [QnaController],
  providers: [
    QnaService, 
    QnaRepository, 
    QnaRoomRepository, 
    PromptService
  ],
  exports: [QnaRepository],
})
export class QnaModule {}
