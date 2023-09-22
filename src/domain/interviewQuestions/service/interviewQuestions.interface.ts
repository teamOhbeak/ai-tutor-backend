import { AnswerRequestDto } from '@/interface/interview-qna/request/answer.resquest';
import { InterviewQuestionDTO } from '@/interface/interview-qna/response/InterviewQuestionDTO';
import { followUpQuestionResponse } from '@/interface/interview-qna/response/followUpQuestionResponse';

export interface InterviewQuestionsService {
  getQuestions(
    interviewId: number,
    stack: string,
  ): Promise<InterviewQuestionDTO>;

  submitAnswer(
    interviewId: number,
    questionId: number,
    answerRequestDto: AnswerRequestDto,
  ): Promise<followUpQuestionResponse>;
}
