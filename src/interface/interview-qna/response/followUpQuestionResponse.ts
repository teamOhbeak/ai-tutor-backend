export class followUpQuestionResponse {
  interviewId: number;
  userId: number;
  stack: string;
  questionId: number;
  followUpQuestions: {
    followUpquestionId: number;
    questionText: string;
    createdAt: Date;
  }[];
}
