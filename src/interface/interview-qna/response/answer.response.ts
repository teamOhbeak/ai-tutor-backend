import { QuestionType } from "../request/answer.resquest";


export class AnswerResponse {
  interviewId: number;
  userId: number;
  stack: string;
  questionCount: number;
  maxWait: number;
  createdAt: Date;
  questionType: QuestionType
  questions: {
    questionid: number,
    question: string,
    status: boolean,
    sequence: number,
    createdAt: Date,
    updatedAt: Date,
    answer: {
      contents: string,
      createdAt: Date,
    },
  };
}