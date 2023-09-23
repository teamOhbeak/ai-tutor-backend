import { FollowUpQnaResponse } from '../../../interface/interview-qna/response/follow-qna.response';
import { MainQnaResponse } from '../../../interface/interview-qna/response/main-qna.response';
import {
  NextQuestionResponse,
  QuestionInfo,
} from '../../../interface/interview-qna/response/next-question.response';
import { QuestionStateResponse } from '../../../interface/interview-qna/response/question-state.response';
import { InterviewStatus } from '../../interview/entity/insterview-status.enum';
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

  static toNextQuestionResponse(
    status: InterviewStatus,
    question?: InterviewQuestionAndAnswerEntity | null,
  ): NextQuestionResponse {
    const response = new NextQuestionResponse();
    response.interviewStatus = status;

    if (question === null) {
      response.question = null;
    } else {
      const q = new QuestionInfo();
      q.questionId = question?.id;
      q.interviewId = question?.interviewId;
      q.questionText = question?.questionText;
      q.answerText = question?.answerText;
      q.startedAt = question?.startedAt;
      q.finishedAt = null;
      q.mainQuestionId = question?.mainQuestionId;
      q.status = question?.status;
      response.question = q;
    }

    return response;
  }

  static toQuestionStateResponse(
    question: InterviewQuestionAndAnswerEntity,
  ): QuestionStateResponse {
    const response = new QuestionStateResponse();
    response.status = question.status;
    // response.
    return response;
  }
}
