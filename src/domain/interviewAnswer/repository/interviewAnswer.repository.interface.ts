// interviewAnswers.repository.ts

import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { InterviewAnswer } from '../entity/interviewAnswer.entity';

@EntityRepository(InterviewAnswer)
export class InterviewAnswersRepository extends Repository<InterviewAnswer> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(InterviewAnswer, dataSource.createEntityManager());
  }
}
