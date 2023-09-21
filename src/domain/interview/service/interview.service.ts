import { MyInterviewDetailResponse } from '@/interface/interview/response/my-interview-detail.response';
import { MyInterviewResponse } from '@/interface/interview/response/my-interview.response';
import { IInterviewService } from './interview.service.interface';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { InterviewRepository } from '../repository/interview.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CreateInterviewInfo, Stack } from './interview.model';
import { InterviewRepositoryImpl } from '../repository/interview.repository';
import { PromptService } from '@/domain/prompt/service/prompt.service';

@Injectable()
export class InterviewService implements IInterviewService {
  constructor(
    private readonly repository: InterviewRepositoryImpl,
    private readonly openAi: PromptService,
  ) {}

  public async createInterview(
    requestModel: CreateInterviewInfo,
  ): Promise<MyInterviewDetailResponse> {
    // const repoResult = await this.repository.saveInterview(requestModel);

    const response = await this.openAi.aiTutorPrompt(
      requestModel.stack,
      requestModel.questionCount,
    );
    console.log(response);
    return {
      id: 1,
      status: 'U',
      stack: Stack.Java,
      questionCount: 10,
      maxWait: 3,
      createdAt: '2023-09-01',
      questions: response,
      userId: 1,
    };
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
