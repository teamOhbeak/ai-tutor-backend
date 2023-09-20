import { Injectable } from '@nestjs/common';
import { InterviewEntity } from './interview.entity';
import { InterviewRepository } from '../repository/interview.repository';
import {
  CreateInterviewInfo,
  Interview,
  Stack,
} from '@/domain/interview/service/interview.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InterviewRepositoryImpl implements InterviewRepository {
  constructor(
    // DB 주입
    @InjectRepository(InterviewEntity)
    private interviewDB: Repository<InterviewEntity>, // @InjectRepository(UserEntity) // private UserDB: Repository<UserEntity>,
  ) {}

  async saveInterview(interviewInfo: CreateInterviewInfo): Promise<Interview> {
    // model -> entity
    const entity = this.interviewDB.create({
      userId: 1,
      stack: interviewInfo.stack,
      questionCount: interviewInfo.questionCount,
      maxWait: interviewInfo.maxWait,
    });

    try {
      await this.interviewDB.save(entity);
      return {
        userId: entity.userId,
        stack: entity.stack as Stack,
        questionCount: entity.questionCount,
        maxWait: entity.maxWait,
        createdAt: entity.createdAt,
      };
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
}
