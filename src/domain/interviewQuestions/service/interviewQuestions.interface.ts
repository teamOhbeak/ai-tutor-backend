import { InterviewQuestionDTO } from '@/interface/interview-qna/response/InterviewQuestionDTO';
import { followUpQuestionResponse } from '@/interface/interview-qna/response/allQuestion.response';

export interface InterviewQuestionsService {
  getQuestions(
    interviewId: number,
    stack: string,
  ): Promise<InterviewQuestionDTO[]>;

  submitAnswer(
    questionId: number,
    answer: string,
  ): Promise<followUpQuestionResponse>;
}
