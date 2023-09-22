import { Inject } from '@nestjs/common';
import { InterviewEntity } from './../entity/interview.entity';
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { InterviewStatus } from '../entity/insterview-status.enum';

@EntityRepository(InterviewEntity)
export class InterviewRepository extends Repository<InterviewEntity> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(InterviewEntity, dataSource.createEntityManager());
  }

  async getInterviewsByUserIdAndStatus(
    userId: number,
    status: InterviewStatus,
  ): Promise<InterviewEntity[]> {
    return await this.find({
      where: {
        userId: userId,
        status: status,
      },
      relations: ['userInfo'],
    });
  }

  async getInterviewDetailById(interviewId: number, userId: number) {
    return this.findOne({
      where: {
        id: interviewId,
        userId: userId // 사실 필요없네
      },
      relations: ['userInfo', 'questions']
    });
  }
}
