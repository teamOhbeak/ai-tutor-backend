import { DataSource, EntityRepository, Repository } from 'typeorm';
import { InterviewQuestionEntity } from '../entity/interview-question.entity';
import { Inject } from '@nestjs/common';

@EntityRepository(InterviewQuestionEntity)
export class InterviewQuestionRepository extends Repository<InterviewQuestionEntity> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(InterviewQuestionEntity, dataSource.createEntityManager());
  }

  async getQuestionsById(
    interviewId: number,
  ): Promise<InterviewQuestionEntity[]> {
    return await this.find({
      where: {
        interviewId: interviewId,
      },
      relations: [
        'answer',
        'answer.followupQuestions',
        'answer.followupQuestions.answer',
      ],
    });
  }

  async saveQuestions(questions: InterviewQuestionEntity[]) {
    return await this.save(questions);
  }
}
