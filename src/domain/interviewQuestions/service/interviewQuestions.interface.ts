import { allQuestionResponse } from "@/interface/interview-qna/response/allQuestion.response";



export interface InterviewQuestionsService{
  getQuestions(interviewId: number, stack: string):Promise< allQuestionResponse[]>;
}