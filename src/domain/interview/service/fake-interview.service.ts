import { Injectable } from "@nestjs/common";
import { IInterviewService } from "./interview.service.interface";
import { MyInterviewResponse } from "src/interface/interview/response/my-interview.response";

@Injectable()
export class FakeInterviewService implements IInterviewService {

  constructor() {
    
  }

  async getMyInterviews()
  : Promise<MyInterviewResponse[]> {

    return Promise.resolve(
      [
        new MyInterviewResponse(1, 'C', '2023-09-01 13:00'),
        new MyInterviewResponse(2, 'C', '2023-09-01 14:00'),
        new MyInterviewResponse(3, 'C', '2023-09-01 15:00'),
        new MyInterviewResponse(4, 'C', '2023-09-01 16:00')
      ]
    );
  }
}