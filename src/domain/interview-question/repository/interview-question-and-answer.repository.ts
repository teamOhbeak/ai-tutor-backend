import { Inject, Injectable } from '@nestjs/common';
import { Repository, DataSource, IsNull } from 'typeorm';
import { InterviewQuestionAndAnswerEntity } from '../entity/interview-question-and-answer.entity';
import { QuestionStatus } from '../entity/question-status.enum';

@Injectable()
export class InterviewQuestionAndAnswerRepository extends Repository<InterviewQuestionAndAnswerEntity> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(InterviewQuestionAndAnswerEntity, dataSource.createEntityManager());
  }

  async getMainQuestions(
    interviewId: number,
  ): Promise<InterviewQuestionAndAnswerEntity[]> {
    try {
      console.log(interviewId);
      return await this.findBy({
        interviewId: interviewId,
        mainQuestionId: IsNull(),
      });
    } catch (e) {
      console.log('hello error');
    }
  }

  async findQuestionById(
    questionId: number,
  ): Promise<InterviewQuestionAndAnswerEntity> {
    const questions =  await this.findOneBy({
      id: questionId,
    });

    // questions.filter((question) => {
    //   return question.mainQuestionId;
    // })
    return questions;
  }

  async getWaitQuestions(
    interviewId: number,
  ): Promise<InterviewQuestionAndAnswerEntity[]> {
    return await this.findBy({
      interviewId: interviewId,
      status: QuestionStatus.WAIT,
    });
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
    await this.insert(questions);
    return await this.save(questions);
  }
}
