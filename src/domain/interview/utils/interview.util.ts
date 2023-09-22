import { MyInterviewResponse } from '@/interface/interview/response/my-interview.response';
import { InterviewEntity } from '../entity/interview.entity';
import * as moment from 'moment';
import { MyInterviewDetailResponse } from '@/interface/interview/response/my-interview-detail.response';
import { CreateInterviewResponse } from '@/interface/interview/response/create-interview.response';
import { InterviewQuestionUtil } from '@/domain/interview-question/utils/interview-question.util';
import { CanceledInterviewResponse } from '@/interface/interview/response/canceled-interview.response';
import { DeletedInterviewResponse } from '@/interface/interview/response/deleted-interview.response';
export class InterviewUtil {
  
  static toCreateInterviewResponse(
    interview: InterviewEntity,
  ): CreateInterviewResponse {
    return new CreateInterviewResponse(interview.id);
  }

  static toInterviewListResponse(
    interviews: InterviewEntity[],
  ): MyInterviewResponse[] {
    console.log(`interviews: ${JSON.stringify(interviews)}`);
    return interviews.map(
      (interview) =>
        new MyInterviewResponse(
          interview.id,
          interview.status,
          moment(interview.createdAt).format('YYYY-MM-DD HH:mm'),
          interview.finishedAt
            ? moment(interview.finishedAt).format('YYYY-MM-DD HH:mm')
            : null,
          interview.userId,
          interview.userInfo.userName,
        ),
    );
  }

  static toInterviewDetailResponse(
    interview: InterviewEntity,
  ): MyInterviewDetailResponse {
    return <MyInterviewDetailResponse>{
      id: interview.id,
      status: interview.status,
      createdAt: moment(interview.createdAt).format('YYYY-MM-DD HH:mm'),
      maxWait: interview.maxWait,
      questionCount: interview.questionCount,
      stack: interview.stack,
      userId: interview.userId,
      userName: interview.userInfo.userName,
      questions: interview.questions.map((question) => {
        return InterviewQuestionUtil.toInterviewQuestionResponse(question);
      }),
    };
  }

  static toCanceledInterviewResponse(
    interview: InterviewEntity,
  ): CanceledInterviewResponse {
    return new CanceledInterviewResponse(interview.id, interview.status);
  }

  static toDeletedInterviewResponse(deletedInterview: InterviewEntity)
  : DeletedInterviewResponse {
    return new DeletedInterviewResponse(deletedInterview.id);
  }
}
