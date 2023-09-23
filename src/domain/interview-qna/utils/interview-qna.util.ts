import { QuestionBankResponse } from '@/interface/questionBank/response/questionBank.response';
import { FollowUpQnaResponse } from '../../../interface/interview-qna/response/follow-qna.response';
import { MainQnaResponse } from '../../../interface/interview-qna/response/main-qna.response';
import { InterviewQnaEntity } from '../entity/interview-qna.entity';
import { QuestionStatus } from '../entity/question-status.enum';
export class InterviewQnaUtil {
  static generateInterviewQuestion(
    interviewId: number,
    questions: QuestionBankResponse[],
  ): InterviewQnaEntity[] {
    return questions.map((question) => {
      const q = new InterviewQnaEntity();
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

  static toMainQuestionResponse(
    question: InterviewQnaEntity,
    followUpQuestions: InterviewQnaEntity[],
  ): MainQnaResponse {
    const q = new MainQnaResponse();
    q.questionId = question.id;
    q.questionText = question.questionText;
    q.answerText = question.answerText;
    q.status = question.status;
    q.mainQuestionId = question.mainQuestionId;
    q.startedAt = question.startedAt;
    q.finishedAt = question.finishedAt;
    q.isPass = q.isPass;

    q.followUpQuestions = followUpQuestions.map(
      (question: InterviewQnaEntity) => {
        return this.toFollowUpQuestionResponse(question);
      },
    );
    return q;
  }

  static toFollowUpQuestionResponse(
    question: InterviewQnaEntity,
  ): FollowUpQnaResponse {
    const q = new FollowUpQnaResponse();
    q.questionId = question.id;
    q.questionText = question.questionText;
    q.answerText = question.answerText;
    q.status = question.status;
    q.mainQuestionId = question.mainQuestionId;
    q.startedAt = question.startedAt;
    q.finishedAt = question.finishedAt;
    q.isPass = q.isPass;
    return q;
  }
}
