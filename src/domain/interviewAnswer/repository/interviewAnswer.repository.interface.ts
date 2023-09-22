// interviewAnswers.repository.ts

import { DataSource, EntityRepository, Repository } from 'typeorm';
import { InterviewAnswer } from '../entity/interviewAnswer.entity';
import { Inject } from '@nestjs/common';

@EntityRepository(InterviewAnswer)
export class InterviewAnswersRepository extends Repository<InterviewAnswer> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(InterviewAnswer, dataSource.createEntityManager());
  }
}
