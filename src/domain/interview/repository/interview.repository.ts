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

  async saveInterview(interviewInfo: CreateInterviewInfo): Promise<number> {
    // model -> entity
    const entity = this.create({
      userId: 1,
      stack: interviewInfo.stack,
      questionCount: interviewInfo.questionCount,
      maxWait: interviewInfo.maxWait,
    });

    try {
      await this.save(entity);
      return entity.id;
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
}
