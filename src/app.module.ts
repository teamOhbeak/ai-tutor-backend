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
import { QuestionBankModule } from './domain/questionsBank/questionBank.module';
import { QuestionBankService } from './domain/questionsBank/service/questionBank.service';
import { QuestionBankRepository } from './domain/questionsBank/repository/questionsBank.repository';
import { BatchService } from './domain/batch/batch.service';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
    }),
    UserModule,
    InterviewModule,
    QnaRoomModule,
    AuthModule,
    PromptModule,
    DatabaseModule,
    QuestionBankModule,
  ],
  controllers: [PromptController],
  providers: [
    PromptService,
    QuestionBankService,
    QuestionBankRepository,
    BatchService,
  ],
})
export class AppModule {}
