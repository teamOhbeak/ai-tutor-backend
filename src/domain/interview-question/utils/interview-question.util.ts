import { QuestionBankResponse } from '@/interface/questionBank/response/questionBank.response';
import { InterviewQuestionEntity } from '../entity/interview-question.entity';
import { QuestionStatus } from '../entity/question-status.enum';
import { InterviewQuestionResponse } from 'src/interface/interview-qna/response/interview-question.response';
import { QuestionType } from '../entity/question-type.enum';
import { InterviewQuestionAndAnswerEntity } from '../entity/interview-question-and-answer.entity';

export class InterviewQuestionUtil {
  static generateInterviewQuestion(
    interviewId: number,
    questions: QuestionBankResponse[],
  ): InterviewQuestionAndAnswerEntity[] {
    // let idx = 0;
    return questions.map((question) => {
      const q = new InterviewQuestionAndAnswerEntity();
      q.questionText = question.question;
      q.userId = 1;
      q.answerText = '';
      q.status = QuestionStatus.WAIT;
      q.isPass = null;
      q.mainQuestionId = null;
      q.startedAt = null;
      q.finishedAt = null;
      q.interviewId = interviewId;
      return q;
    });
  }

  static toInterviewQuestionResponse(
    question: InterviewQuestionEntity,
  ): InterviewQuestionResponse {
    const q = new InterviewQuestionResponse();
    q.id = question.questionId;
    q.sequence = question.sequence;
    q.interviewId = question.interviewId;
    q.questionText = question.questionText;
    q.status = question.status;
    q.type = QuestionType.MAIN_QUESTION;
    q.startedAt = question.startedAt;
    q.finishedAt = question.finishedAt;

    // q.answer = question.an
    return q;
  }
}
