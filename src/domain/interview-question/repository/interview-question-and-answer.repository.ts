import { Inject } from '@nestjs/common';
import { InterviewEntity } from '../../interview/entity/interview.entity';
import { DataSource, EntityRepository, IsNull, Repository } from 'typeorm';
// import { InterviewStatus } from '../../interview/entity/insterview-status.enum';
import { InterviewQuestionAndAnswerEntity } from '../entity/interview-question-and-answer.entity';

@EntityRepository(InterviewQuestionAndAnswerEntity)
export class InterviewQuestionAndAnswerRepository extends Repository<InterviewQuestionAndAnswerEntity> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(InterviewEntity, dataSource.createEntityManager());
  }

  async getMainQuestions(
    interviewId: number,
  ): Promise<InterviewQuestionAndAnswerEntity[]> {
    try {
      console.log(interviewId);
      return await this.findBy({
        interviewId: interviewId,
        // mainQuestionId: IsNull(),
      });
    } catch (e) {
      console.log('hello error');
    }
  }

  async getFollowUpQuestions(
    interviewId: number,
  ): Promise<InterviewQuestionAndAnswerEntity[]> {
    return this.findBy({
      interviewId: interviewId,
      // mainQuestionId: Is
    });
  }

  async getFollowUpQuestionsByQuestionId(
    interviewId: number,
    mainQuestionId: number,
  ): Promise<InterviewQuestionAndAnswerEntity[]> {
    return this.findBy({
      interviewId: interviewId,
      mainQuestionId: mainQuestionId,
    });
  }

  async saveQuestions(questions: InterviewQuestionAndAnswerEntity[]) {
    return await this.save(questions);
  }
}
