import { Injectable } from '@nestjs/common';
import { InterviewQuestionRepository } from '../repository/interview-question.repository';
import { InterviewQuestionEntity } from '../entity/interview-question.entity';

@Injectable()
export class InterviewQuestionService {
  constructor(
    private readonly interviewQuestionRepository: InterviewQuestionRepository,
  ) {}

  async getInterviewQuestions(
    interviewId: number,
  ): Promise<InterviewQuestionEntity[]> {
    return await this.interviewQuestionRepository.getQuestionsById(interviewId);
  }
  async saveInterviewQuestions(
    questions: InterviewQuestionEntity[],
  ): Promise<InterviewQuestionEntity[]> {
    return await this.interviewQuestionRepository.saveQuestions(questions);
  }
}
