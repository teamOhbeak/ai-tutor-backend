import { MyInterviewResponse } from "src/interface/interview/response/my-interview.response";

export interface IInterviewService {
  getMyInterviews(userId: number): Promise<MyInterviewResponse[]> 
}