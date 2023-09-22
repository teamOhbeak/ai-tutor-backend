import {
  DataSource,
  EntityRepository,
  Repository,
  getConnection,
  getRepository,
} from 'typeorm';
import { InterviewQuestionsEntity } from '../entity/interviewQuestions.entity';
import { InterviewQuestionsRepository } from './interviewQuestions.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { InterviewQuestionDTO } from '@/interface/interview-qna/response/InterviewQuestionDTO';

@EntityRepository(InterviewQuestionsEntity)
export class InterviewQuestionsRepositoryImpl
  extends Repository<InterviewQuestionsEntity>
  implements InterviewQuestionsRepository
{
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    super(InterviewQuestionsEntity, dataSource.createEntityManager());
  }

  async getQuestions(interviewId: number): Promise<InterviewQuestionDTO[]> {
    try {
      const results = await this.createQueryBuilder('interview_questions')
        .select([
          'interview_questions.id AS interview_questions_id',
          'interview_questions.questionText AS interview_questions_questionText',
          'interview.stack AS interview_stack',
        ])
        .leftJoin('interview_questions.interview', 'interview')
        .where('interview.id = :interviewId', { interviewId })
        .getRawMany();

      // DTO로 매핑하여 반환
      return results.map((result) => ({
        questionId: result.interview_questions_id,
        questionText: result.interview_questions_questionText,
        stack: result.interview_stack,
      }));
    } catch (error) {
      console.error('Error in getQuestions:', error);
      throw new Error('Failed to get questions.');
    }
  }
}
