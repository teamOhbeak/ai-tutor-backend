import {
  DataSource,
  EntityRepository,
  Repository,
  getConnection,
  getRepository,
} from 'typeorm';
import { InterviewQuestionsEntity } from '../entity/interviewQuestions.entity';
import { InterviewQuestionsRepository } from './interviewQuestions.repository.';
import { Inject, Injectable } from '@nestjs/common';

@EntityRepository(InterviewQuestionsEntity)
export class InterviewQuestionsRepositoryImpl
  extends Repository<InterviewQuestionsEntity>
  implements InterviewQuestionsRepository
{
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    super(InterviewQuestionsEntity, dataSource.createEntityManager());
  }

  async getQuestions(
    questionId: number,
    stack: string,
  ): Promise<InterviewQuestionsEntity[]> {
    console.log('레포지토리');
    try {
      // const repository = getRepository(InterviewQuestionsEntity); // getRepository 사용
      // const results = await repository
      //   .createQueryBuilder('iq')
      //   .where('iq.id = :id', { id: questionId })
      //   .getMany();

      const results = await this.createQueryBuilder('Interview_questions')
        .leftJoinAndSelect('Interview_questions.interview', 'interview')
        .where('id = :questionId', { questionId })
        .getMany();
      console.log('results');
      console.log('results가 나오긴하니?');
      return results;
    } catch (error) {
      console.error('Error in getQuestions:', error); // 에러 로깅 추가
      throw new Error('Failed to get questions.');
    }
  }
}
