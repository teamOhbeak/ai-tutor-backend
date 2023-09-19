import { MyInterviewDetailResponse } from "src/interface/interview/response/my-interview-detail.response";
import { MyInterviewResponse } from "src/interface/interview/response/my-interview.response";

export interface IInterviewService {
  getMyInterviews(userId: number): Promise<MyInterviewResponse[]>;
  getMyInterviewDetail(userId: number, interviewId: number): Promise<MyInterviewDetailResponse>;
}