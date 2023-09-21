import { MyInterviewDetailResponse } from '@/interface/interview/response/my-interview-detail.response';
import { MyInterviewResponse } from '@/interface/interview/response/my-interview.response';
import { IInterviewService } from './interview.service.interface';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { Injectable } from '@nestjs/common';
import { InterviewRepositoryImpl } from '../repository/interview.repository';
import { PromptService } from '@/domain/prompt/service/prompt.service';
import { QuestionBankRepository } from '@/domain/questionsBank/repository/questionsBank.repository';
import { InterviewEntity } from '../entity/interview.entity';

@Injectable()
export class InterviewService {
  constructor(
    private readonly interviewRepository: InterviewRepositoryImpl,
    private readonly questionBankRepository: QuestionBankRepository,
    private readonly openAi: PromptService,
  ) {}

  public async createInterview(
    userId: number,
    dto: CreateInterviewRequest,
  ): Promise<InterviewEntity> {
    const interview = InterviewEntity.CreateInterview(userId, dto);
    return await this.interviewRepository.save(interview);
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
