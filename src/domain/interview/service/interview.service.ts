import { MyInterviewDetailResponse } from '@/interface/interview/response/my-interview-detail.response';
import { MyInterviewResponse } from '@/interface/interview/response/my-interview.response';
import { IInterviewService } from './interview.service.interface';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { InterviewRepository } from '../repository/interview.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CreateInterviewInfo, Stack } from './interview.model';
import { InterviewRepositoryImpl } from '../repository/interview.repository';
import { PromptService } from '@/domain/prompt/service/prompt.service';
import { QuestionBankRepository } from '@/domain/questionsBank/repository/questionsBank.repository';

@Injectable()
export class InterviewService implements IInterviewService {
  constructor(
    private readonly interviewRepository: InterviewRepositoryImpl,
    private readonly questionBankRepository: QuestionBankRepository,
    private readonly openAi: PromptService,
  ) {}

  public async createInterview(
    requestModel: CreateInterviewInfo,
  ): Promise<number> {
    const interviewId = await this.interviewRepository.saveInterview(
      requestModel,
    );

    const aiQuestions = await this.questionBankRepository.getQuestions(
      requestModel.questionCount,
    );
    console.log(aiQuestions);

    return interviewId;
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
