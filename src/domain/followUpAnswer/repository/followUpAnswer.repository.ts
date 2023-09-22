import { DataSource, EntityRepository, Repository } from 'typeorm';
import { FollowUpAnswer } from '../entity/followUpAnswer.entity';
import { Inject } from '@nestjs/common';

@EntityRepository(FollowUpAnswer)
export class FollowUpAnswerRepositoryImpl extends Repository<FollowUpAnswer> {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    super(FollowUpAnswer, dataSource.createEntityManager());
  }
  
  someProperty: string;
  someMethod(): void {
    throw new Error('Method not implemented.');
  }
}
