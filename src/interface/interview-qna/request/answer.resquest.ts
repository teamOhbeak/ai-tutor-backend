

export enum QuestionType {
  MAIN = 'MAIN',
  FOLLOWUP = 'FOLLOWUP'
}

export class AnswerRequestDto {
  questionType: QuestionType;
  interviewQuestionId: number;
  followUpQuestionId: number;
  answer: string
}