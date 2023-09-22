import { Module } from '@nestjs/common';
import { PromptService } from './domain/prompt/service/prompt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PromptController } from './interface/prompt/prompt.controller';
import config from './config/config';
import { InterviewModule } from 'src/domain/interview/interview.module';
import { AuthModule } from './domain/auth/auth.module';
import { PromptModule } from './domain/prompt/prompt.module';
import { DatabaseModule } from './domain/database/database.module';
import { QuestionBankModule } from './domain/questionsBank/questionBank.module';
import { QuestionBankService } from './domain/questionsBank/service/questionBank.service';
import { QuestionBankRepository } from './domain/questionsBank/repository/questionsBank.repository';
import { QnaModule } from './domain/qna/qna.module';
import { QnaRoomModule } from './domain/qna-room/qna-room.module';
import { QnaRoomService } from './domain/qna-room/service/qna-room.service';
import { BatchService } from './domain/batch/batch.service';
import { UserModule } from './domain/user/user.module';
import { InterviewQuestionsModule } from './domain/interviewQuestions/interviewQuestions.module';
import { InterviewAnswerModule } from './domain/interviewAnswer/interviewAnswer.module';
import { FollowUpQuestionsModule } from './domain/followUpQuestions/followUpQuestions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    UserModule,
    InterviewModule,
    InterviewQuestionsModule,
    InterviewAnswerModule,
    FollowUpQuestionsModule,
    QnaRoomModule,
    AuthModule,
    PromptModule,
    QuestionBankModule,
    QnaModule,
  ],
  controllers: [PromptController],
  providers: [
    PromptService,
    QuestionBankService,
    QuestionBankRepository,
    QnaRoomService,
    BatchService,
  ],
})
export class AppModule {}
