import { MyInterviewDetailResponse } from '@/interface/interview/response/my-interview-detail.response';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { Injectable } from '@nestjs/common';
import { InterviewEntity } from '../entity/interview.entity';
import { InterviewRepository } from '../repository/interview.repository';

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

  async getMyInterviews(userId: number): Promise<InterviewEntity[]> {
    const interviews = await this.interviewRepository.findBy({
      userId: userId,
    });
    console.log(`interviews: ${JSON.stringify(interviews)}`);
    return interviews;
  }

  getMyInterviewDetail(
    userId: number,
    interviewId: number,
  ): Promise<MyInterviewDetailResponse> {
    throw new Error('Method not implemented.');
  }
}
