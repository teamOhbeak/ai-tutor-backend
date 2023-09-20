import { Module } from '@nestjs/common';
import { PromptService } from './domain/prompt/service/prompt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PromptController } from './interface/prompt/prompt.controller';
import config from './config/config';
import { InterviewModule } from 'src/domain/interview/interview.module';
import { QnaRoomModule } from './domain/qna-room/qna-room.module';
import { AuthModule } from './domain/auth/auth.module';
import { PromptModule } from './domain/prompt/prompt.module';
import { DatabaseModule } from './domain/database/database.module';
import { QuestionsBankModule } from './domain/questionsBank/questionsBank.module';
import { QuestionsBankService } from './domain/questionsBank/service/questionsBank.service';

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
    QuestionsBankModule,
  ],
  controllers: [PromptController],
  providers: [PromptService, QuestionsBankService],
})
export class AppModule {}
