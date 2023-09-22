import { Inject } from '@nestjs/common';
import { InterviewEntity } from './../entity/interview.entity';
import { CreateInterviewInfo } from 'src/domain/interview/service/interview.model';
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

  async saveInterview(interviewInfo: CreateInterviewInfo): Promise<number> {
    // model -> entity
    // const entity = this.create({
    //   userId: 1,
    //   stack: interviewInfo.stack,
    //   questionCount: interviewInfo.questionCount,
    //   maxWait: interviewInfo.maxWait,
    // });

    try {
      //   await this.save(entity);
      //   return entity.id;
      return 0;
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }

  async getInterviewsByUserIdAndStatus(
    userId: number,
    status: InterviewStatus
  ): Promise<InterviewEntity[]> {
    return await this.find({
      where: {
        userId: userId,
        status: status,
      },
      relations: ['userInfo'],
    });
  }
}
