import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { PromptService } from './prompt/prompt.service';
import { ConfigModule } from '@nestjs/config';
import { PromptController } from './prompt/prompt.controller';
import config from './config/config';

import { InterviewModule } from 'src/domain/interview/interview.module';
import { QnaRoomModule } from './domain/qna-room/qna-room.module';
import { AuthModule } from './domain/auth/auth.module';
import { PromptModule } from './prompt/prompt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      load: [config],
    }),
    InterviewModule,
    QnaRoomModule,
    AuthModule,
    PromptModule,
  ],
  controllers: [AppController, UserController, PromptController],
  providers: [AppService, PromptService],
})
export class AppModule {}
