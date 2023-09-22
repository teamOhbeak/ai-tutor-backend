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

  async getQuestions(interviewId: number): Promise<InterviewQuestionDTO> {
    try {
      const results = await this.createQueryBuilder('interview_questions')
        .select([
          'interview.stack AS stack',
          'interview_questions.id AS questionId',
          'interview_questions.questionText AS questionText',
          'interview_questions.createdAt AS createdAt',
        ])
        .leftJoin(
          'interview',
          'interview',
          'interview.id = interview_questions.interviewId',
        )
        .where('interview.id = :interviewId', { interviewId })
        .getRawMany();

      // "stack" 필드를 기준으로 그룹화
      const groupedResults = results.reduce((acc, result) => {
        if (!acc.stack) {
          acc.interviewId = interviewId;
          acc.userId = 1;
          acc.stack = result.stack;
          acc.questions = [];
        }
        acc.questions.push({
          questionId: result.questionId,
          questionText: result.questionText,
          createdAt: result.createdAt,
        });
        return acc;
      }, {} as InterviewQuestionDTO);

      return groupedResults;
    } catch (error) {
      console.error('Error in getQuestions:', error);
      throw new Error('Failed to get questions.');
    }
  }

  async updateQuestionStatus(
    questionId: number,
    maxSequence: number,
  ): Promise<InterviewQuestionsEntity | null> {
    try {
      // 다음 질문의 sequence에 맞추기 위해+1
      const currentSequence = maxSequence + 1;

      const updatedEntity = await this.findOne({
        where: { id: questionId },
      });

      if (updatedEntity) {
        updatedEntity.status = true;
        updatedEntity.sequence = currentSequence;
        updatedEntity.updatedAt = new Date();

        await this.save(updatedEntity);

        return updatedEntity;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error in updateQuestionStatus:', error);
      throw new Error('Failed to update question status.');
    }
  }

  async getHighestSequenceByQuestionId(
    questionId: number,
  ): Promise<number | null> {
    try {
      const result = await this.createQueryBuilder('interview_questions')
        .select('MAX(interview_questions.sequence)', 'max_sequence')
        .where('interview_questions.id = :questionId', { questionId })
        .getRawOne();

      if (result && result.max_sequence !== null) {
        return parseInt(result.max_sequence, 10);
      } else {
        return 0; // 결과가 없거나 max_sequence가 null인 경우
      }
    } catch (error) {
      console.error('Error in getHighestSequenceByQuestionId:', error);
      throw new Error('Failed to get the highest sequence.');
    }
  }
}
