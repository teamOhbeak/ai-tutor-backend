import { Injectable } from '@nestjs/common';
import { InterviewQuestionsService } from './interviewQuestions.interface';
import { InterviewQuestionsRepository } from '../repository/interviewQuestions.repository.';
import { allQuestionResponse } from '@/interface/interview-qna/response/allQuestion.response';
import { InterviewQuestionsRepositoryImpl } from '../repository/interviewQuestion.repository.interface';

@Injectable()
export class InterviewQuestionsServiceImpl
  implements InterviewQuestionsService
{
  constructor(
    private readonly interviewQuestionsRepository: InterviewQuestionsRepositoryImpl,
  ) {}

  public async getQuestions(
    questionId: number,
    stack: string,
  ): Promise<allQuestionResponse[]> {
    console.log('서비스');

    try {
      console.log('레포가기전');

      const repo = await this.interviewQuestionsRepository.getQuestions(
        questionId,
        stack,
      );
      console.log('레포간 후');

      console.log(repo);
      return [
        {
          questionId: 1,
          questionText: 'zzz',
        },
      ];
    } catch {
      throw new Error('Method not implemented.');
    }
  }
}
