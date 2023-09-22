import { DataSource, EntityRepository, Repository } from 'typeorm';
import { FollowUpAnswer } from '../entity/followUpAnswer.entity';
import { FollowUpAnswerRepository } from './followUpAnswer.repository.interface';
import { Inject } from '@nestjs/common';

@EntityRepository(FollowUpAnswer)
export class FollowUpAnswerRepositoryImpl
  extends Repository<FollowUpAnswer>
  implements FollowUpAnswerRepository
{
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    super(FollowUpAnswer, dataSource.createEntityManager());
  }
}
