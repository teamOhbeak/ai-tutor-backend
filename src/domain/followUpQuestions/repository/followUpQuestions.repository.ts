import { DataSource, EntityRepository, Repository } from 'typeorm';
import { FollowUpQuestions } from '../entity/followUpQuestions.entity';
import { Inject } from '@nestjs/common';
import { FollowUpQuestionsRepository } from './followUpQuestions.repository.interface';

@EntityRepository(FollowUpQuestions)
export class FollowUpQuestionsRepositoryImpl
  extends Repository<FollowUpQuestions>
  implements FollowUpQuestionsRepository
{
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    super(FollowUpQuestions, dataSource.createEntityManager());
  }

  async hasFollowUpQuestions(questionId: number): Promise<boolean> {
    try {
      const count = await this.count({
        where: {
          interviewQuestionsId: questionId,
          sequence: 1, // sequence가 1인 데이터
        },
      });
      return count > 0; // count가 0보다 크면 true, 아니면 false 반환
    } catch (error) {
      console.error('Error in getQuestions:', error);
      throw new Error('Failed to get questions.');
    }
  }
}
