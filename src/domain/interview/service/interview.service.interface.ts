import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { MyInterviewDetailResponse } from 'src/interface/interview/response/my-interview-detail.response';
import { MyInterviewResponse } from 'src/interface/interview/response/my-interview.response';

export interface IInterviewService {

  createInterview(request: CreateInterviewRequest): Promise<MyInterviewDetailResponse>;
  getMyInterviews(userId: number): Promise<MyInterviewResponse[]>;
  getMyInterviewDetail(
    userId: number,
    interviewId: number,
  ): Promise<MyInterviewDetailResponse>;
}
