import { InterviewQuestionEntity } from '@/domain/interview-question/entity/interview-question.entity';
import { QuestionStatus } from '@/domain/interview-question/entity/question-status.enum';
import { QuestionBankResponse } from '@/interface/questionBank/response/questionBank.response';
import { InterviewEntity } from '../entity/interview.entity';
import { CreateInterviewResponse } from '../../../interface/interview/response/create-interview.response';

export class InterviewQuestionUtil {
  static generateInterviewQuestion(
    interviewId: number,
    questions: QuestionBankResponse[],
  ): InterviewQuestionEntity[] {
    let idx = 0;
    return questions.map((question) => {
      const q = new InterviewQuestionEntity();
      q.interviewId = interviewId;
      q.questionText = question.question;
      q.sequence = idx++;
      q.status = QuestionStatus.WAIT;
      return q;
    });
  }

  static toCreateInterviewResponse(
    interview: InterviewEntity,
  ): CreateInterviewResponse {
    return new CreateInterviewResponse(interview.id);
  }
}
