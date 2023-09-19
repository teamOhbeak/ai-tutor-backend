import { MyInterviewResponse } from "src/interface/interview/response/my-interview.response";

export interface IInterviewService {
  getMyInterviews(): Promise<MyInterviewResponse[]> 
}