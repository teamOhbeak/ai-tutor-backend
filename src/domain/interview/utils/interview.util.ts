import { MyInterviewResponse } from '@/interface/interview/response/my-interview.response';
import { InterviewEntity } from '../entity/interview.entity';
import { InterviewStatus } from '../entity/insterview-status.enum';
import * as moment from 'moment';

export class InterviewUtil {
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
}
