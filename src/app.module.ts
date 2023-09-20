import { Module } from '@nestjs/common';
import { PromptService } from './domain/prompt/service/prompt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PromptController } from './interface/prompt/prompt.controller';
import config from './config/config';
import { InterviewModule } from 'src/domain/interview/interview.module';
import { AuthModule } from './domain/auth/auth.module';
import { PromptModule } from './domain/prompt/prompt.module';
import { DatabaseModule } from './domain/database/database.module';
import { QnaModule } from './domain/qna/qna.module';
import { QnaRoomModule } from './domain/qna-room/qna-room.module';
import { QnaRoomService } from './domain/qna-room/service/qna-room.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
    }),
    InterviewModule,
    QnaRoomModule,
    AuthModule,
    PromptModule,
    DatabaseModule,
    QnaModule,
  ],
  controllers: [PromptController],
  providers: [PromptService, QnaRoomService],
})
export class AppModule {}
