import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterviewModule } from 'src/domain/interview/interview.module';
import { QnaRoomModule } from './domain/qna-room/qna-room.module';

@Module({
  imports: [
    InterviewModule,
    QnaRoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
