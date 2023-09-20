import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { QnaController } from '@/interface/qna-room-qna/qna.controller';
import { QnaService } from './service/qna.service';

@Module({
  imports: [DatabaseModule],
  controllers: [QnaController],
  providers: [QnaService],
})
export class QnaModule { }
