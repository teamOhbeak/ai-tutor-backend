import { AnswerRequestDto } from '@/interface/interview-qna/request/answer.resquest';
import { InterviewQuestionDTO } from '@/interface/interview-qna/response/InterviewQuestionDTO';
import { AnswerResponse } from '@/interface/interview-qna/response/answer.response';
import { followUpQuestionResponse } from '@/interface/interview-qna/response/followUpQuestionResponse';

export interface InterviewQuestionsService {
  getQuestions(
    interviewId: number,
    stack: string,
  ): Promise<InterviewQuestionDTO>;

  submitAnswer(
    interviewId: number,
    answerRequestDto: AnswerRequestDto,
  ): Promise<AnswerResponse>;
}
