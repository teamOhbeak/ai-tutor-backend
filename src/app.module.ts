import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterviewModule } from 'src/domain/interview/interview.module';

@Module({
  imports: [
    InterviewModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
