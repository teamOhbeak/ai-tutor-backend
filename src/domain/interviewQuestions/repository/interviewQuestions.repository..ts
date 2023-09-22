import { InterviewQuestionDTO } from '@/interface/interview-qna/response/InterviewQuestionDTO';
import { InterviewQuestionsEntity } from '../entity/interviewQuestions.entity';

export interface InterviewQuestionsRepository {
  getQuestions(
    interviewId: number
  ): Promise<InterviewQuestionDTO[]>;
}
