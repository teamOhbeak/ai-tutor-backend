import { FollowUpQnaResponse } from '../../../interface/interview-qna/response/follow-qna.response';
import { MainQnaResponse } from '../../../interface/interview-qna/response/main-qna.response';
import { InterviewQuestionAndAnswerEntity } from '../entity/interview-question-and-answer.entity';
export class InterviewQnaUtil {
  static toMainQuestionResponse(
    question: InterviewQuestionAndAnswerEntity,
    followUpQuestions: InterviewQuestionAndAnswerEntity[],
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
      (question: InterviewQuestionAndAnswerEntity) => {
        return this.toFollowUpQuestionResponse(question);
      },
    );
    return q;
  }

  static toFollowUpQuestionResponse(
    question: InterviewQuestionAndAnswerEntity,
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
