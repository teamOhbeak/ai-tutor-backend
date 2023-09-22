import { QuestionStatus } from '@/domain/interview-question/entity/question-status.enum';
import { QuestionType } from '@/domain/interview-question/entity/question-type.enum';

export class InterviewQuestionResponse {
  id: number;
  questionText: string;
  interviewId: number;
  sequence: number;
  status: QuestionStatus;
  type: QuestionType;
  startedAt: any;
  finishedAt: Date;
}
