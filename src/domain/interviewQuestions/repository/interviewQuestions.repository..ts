import { InterviewQuestionsEntity } from "../entity/interviewQuestions.entity";


export interface InterviewQuestionsRepository {
  getQuestions(interviewId: number, stack: string): Promise<InterviewQuestionsEntity[]>;
}