import { MyInterviewDetailResponse } from 'src/interface/interview/response/my-interview-detail.response';
import { MyInterviewResponse } from 'src/interface/interview/response/my-interview.response';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { InterviewEntity } from '../entity/interview.entity';

export interface IInterviewService {
  createInterview(
    userId: number,
    dto: CreateInterviewRequest,
  ): Promise<InterviewEntity>;
  getMyInterviews(userId: number): Promise<MyInterviewResponse[]>;
  getMyInterviewDetail(
    userId: number,
    interviewId: number,
  ): Promise<MyInterviewDetailResponse>;
}
