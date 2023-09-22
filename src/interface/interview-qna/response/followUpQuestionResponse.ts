export class followUpQuestionResponse {
  interviewId: number;
  userId: number;
  stack: string;
  questionCount: number;
  maxWait: number;
  createdAt: Date;
  questions: {
    questionid: number;
    question: string;
    status: 0;
    createdAt: Date;
    updatedAt: Date;
    followUpQuestions: {
      followUpquestionId: number;
      questionText: string;
      createdAt: Date;
    }[];
    answer: {
      contents: string;
      createdAt: string;
    };
  }[];
}
