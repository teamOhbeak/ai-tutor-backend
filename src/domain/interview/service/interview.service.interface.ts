import { MyInterviewDetailResponse } from 'src/interface/interview/response/my-interview-detail.response';
import { MyInterviewResponse } from 'src/interface/interview/response/my-interview.response';
import { CreateInterviewInfo } from './interview.model';

export interface IInterviewService {
  createInterview(
    requestModel: CreateInterviewInfo,
  ): Promise<number>;
  getMyInterviews(userId: number): Promise<MyInterviewResponse[]>;
  getMyInterviewDetail(
    userId: number,
    interviewId: number,
  ): Promise<MyInterviewDetailResponse>;
}
