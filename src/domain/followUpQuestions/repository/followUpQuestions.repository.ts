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

  async updateQuestionStatus(
    followUpQuestionId: number,
  ): Promise<FollowUpQuestions | null> {
    try {
      // 업데이트된 엔티티를 조회
      const updatedEntity = await this.findOne({
        where: { id: followUpQuestionId },
      });

      if (updatedEntity) {
        // 엔티티 업데이트
        updatedEntity.status = true;
        updatedEntity.updatedAt = new Date();

        // 엔티티 저장
        await this.save(updatedEntity);

        return updatedEntity; // 업데이트된 엔티티 반환
      } else {
        return null; // 해당 ID에 해당하는 엔티티가 없을 경우 null 반환
      }
    } catch (error) {
      console.error('Error in updateQuestionStatus:', error);
      throw new Error('Failed to update question status.');
    }
  }
}
