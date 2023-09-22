import { MyInterviewDetailResponse } from '@/interface/interview/response/my-interview-detail.response';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { Injectable } from '@nestjs/common';
import { InterviewEntity } from '../entity/interview.entity';
import { InterviewRepository } from '../repository/interview.repository';
import { InterviewStatus } from '../entity/insterview-status.enum';

@Injectable()
export class InterviewService {
  constructor(private readonly interviewRepository: InterviewRepository) {}

  async createInterview(
    userId: number,
    dto: CreateInterviewRequest,
  ): Promise<InterviewEntity> {
    const interview = InterviewEntity.CreateInterview(userId, dto);
    return await this.interviewRepository.save(interview);
  }

  async getMyCompletedInterviews(userId: number): Promise<InterviewEntity[]> {
    return await this.interviewRepository
      .getInterviewsByUserIdAndStatus(userId, InterviewStatus.DONE);
  }

  getMyInterviewDetail(
    userId: number,
    interviewId: number,
  ): Promise<MyInterviewDetailResponse> {
    throw new Error('Method not implemented.');
  }
}
