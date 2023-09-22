export class InterviewQuestionDTO {
  interviewId: number;
  userId: number;
  stack: string;
  questions: {
    questionId: number;
    questionText: string;
    createdAt: Date;
  }[];
}
