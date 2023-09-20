import { Inject } from '@nestjs/common';
import { InterviewEntity } from '../entity/interview.entity';
import { InterviewRepository } from './interview.repository.interface';
import {
  CreateInterviewInfo,
  Interview,
  Stack,
} from '@/domain/interview/service/interview.model';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(InterviewEntity)
export class InterviewRepositoryImpl
  extends Repository<InterviewEntity>
  implements InterviewRepository
{
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(InterviewEntity, dataSource.createEntityManager());
  }

  async saveInterview(interviewInfo: CreateInterviewInfo): Promise<Interview> {
    // model -> entity
    const entity = this.create({
      userId: 1,
      stack: interviewInfo.stack,
      questionCount: interviewInfo.questionCount,
      maxWait: interviewInfo.maxWait,
    });

    try {
      await this.save(entity);
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
