import { MyInterviewDetailResponse } from '@/interface/interview/response/my-interview-detail.response';
import { MyInterviewResponse } from '@/interface/interview/response/my-interview.response';
import { IInterviewService } from './interview.service.interface';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { InterviewRepository } from '../repository/interview.repository.interface';
import { Inject } from '@nestjs/common';
import { CreateInterviewInfo } from './interview.model';
import { InterviewRepositoryImpl } from '../repository/interview.repository';

export class InterviewService implements IInterviewService {
  constructor(
    private readonly repository: InterviewRepositoryImpl,
  ) {}

  public async createInterview(
    requestModel: CreateInterviewInfo,
  ): Promise<MyInterviewDetailResponse> {
    await this.repository.saveInterview(requestModel);
    return;
  }

  getMyInterviews(userId: number): Promise<MyInterviewResponse[]> {
    throw new Error('Method not implemented.');
  }
  getMyInterviewDetail(
    userId: number,
    interviewId: number,
  ): Promise<MyInterviewDetailResponse> {
    throw new Error('Method not implemented.');
  }
}
