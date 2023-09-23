import { DataSource, IsNull, Repository } from 'typeorm';
import { InterviewQnaEntity } from '../entity/interview-qna.entity';
import { Inject } from '@nestjs/common';
import { QuestionStatus } from '../entity/question-status.enum';

export class InterviewQnaReposiroy extends Repository<InterviewQnaEntity> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(InterviewQnaEntity, dataSource.createEntityManager());
  }

  async insertInterviewQuestions(
    questions: InterviewQnaEntity[],
  ): Promise<InterviewQnaEntity[]> {
    console.log(`quesetions: ${JSON.stringify(questions)}`);
    return [];
  }

  async getMainQuestions(interviewId: number): Promise<InterviewQnaEntity[]> {
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

  async getAllQuestionsByInterviewIdAndStatus(
    interviewId: number,
    status: QuestionStatus.WAIT,
  ): Promise<InterviewQnaEntity[]> {
    return await this.findBy({
      interviewId: interviewId,
      status: status,
    });
  }

  async getFollowUpQuestions(
    interviewId: number,
  ): Promise<InterviewQnaEntity[]> {
    const questions = await this.findBy({
      interviewId: interviewId,
      // mainQuestionId: Is
    });
    return questions.filter((question) => {
      return question.mainQuestionId != null;
    });
  }

  async getFollowUpQuestionsByQuestionId(
    interviewId: number,
    mainQuestionId: number,
  ): Promise<InterviewQnaEntity[]> {
    return this.findBy({
      interviewId: interviewId,
      mainQuestionId: mainQuestionId,
    });
  }

  async saveQuestions(questions: InterviewQnaEntity[]) {
    return await this.save(questions);
  }
}
