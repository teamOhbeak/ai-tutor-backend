import { Module } from '@nestjs/common';
import { InterviewQnaController } from 'src/interface/interview-qna/interview-qna.controller';
import { FakeInterviewService } from 'src/domain/interview/service/fake-interview.service';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewEntity } from './entity/interview.entity';
import { InterviewService } from './service/interview.service';
import { InterviewRepositoryImpl } from './repository/interview.repository';
import { InterviewController } from '@/interface/interview/interview.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewController, InterviewQnaController],
  providers: [InterviewService, InterviewRepositoryImpl],
})
export class InterviewModule {}
