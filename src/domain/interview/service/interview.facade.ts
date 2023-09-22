import { HttpException, Injectable } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewQuestionService } from '@/domain/interview-question/service/interview-question.service';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { IFakeQuestionBankService } from '@/domain/questionsBank/service/fake-questionBank.interface';
import { FakeQuestionBankService } from '@/domain/questionsBank/service/fake-questionBank.service';
import { CreateInterviewResponse } from '@/interface/interview/response/create-interview.response';
import { InterviewUtil } from '../utils/interview.util';
import { MyInterviewResponse } from '@/interface/interview/response/my-interview.response';
import { MyInterviewDetailResponse } from '@/interface/interview/response/my-interview-detail.response';
import { InterviewQuestionUtil } from '@/domain/interview-question/utils/interview-question.util';
import { CanceledInterviewResponse } from '@/interface/interview/response/canceled-interview.response';
import { DeletedInterviewResponse } from '@/interface/interview/response/deleted-interview.response';
import { DeleteResult } from 'typeorm';

@Injectable()
export class InterviewFacade {
  private readonly questionBankService: IFakeQuestionBankService;
  constructor(
    private readonly interviewService: InterviewService,
    private readonly interviewQuestionService: InterviewQuestionService,
  ) {
    this.questionBankService = new FakeQuestionBankService();
  }

  async createInterview(
    userId: number,
    dto: CreateInterviewRequest,
  ): Promise<CreateInterviewResponse> {
    const interviewRoom = await this.interviewService.createInterview(
      userId,
      dto,
    );

    const questions = await this.questionBankService.getFakeQuestions(
      dto.questionCount,
    );

    const interviewQuestions = InterviewQuestionUtil.generateInterviewQuestion(
      interviewRoom.id,
      questions,
    );

    interviewRoom.questions =
      await this.interviewQuestionService.saveInterviewQuestions(
        interviewQuestions,
      );

    return InterviewUtil.toCreateInterviewResponse(interviewRoom);
  }

  async getMyCompletedInterviews(
    userId: number,
  ): Promise<MyInterviewResponse[]> {
    const interviews = await this.interviewService.getMyCompletedInterviews(
      userId,
    );
    return InterviewUtil.toInterviewListResponse(interviews);
  }

  async getMyInterviewDetail(
    userId: number,
    interviewId: number,
  ): Promise<MyInterviewDetailResponse> {
    const interview = await this.interviewService.findInterview(
      userId,
      interviewId,
    );
    return InterviewUtil.toInterviewDetailResponse(interview);
  }

  async cancelInterview(
    userId: number,
    interviewId: number,
  ): Promise<CanceledInterviewResponse> {
    const canceledInterview = await this.interviewService.cancelInterview(
      userId,
      interviewId,
    );
    return InterviewUtil.toCanceledInterviewResponse(canceledInterview);
  }

  async deleteInterview(
    userId: number,
    interviewId: number,
  ): Promise<DeletedInterviewResponse> {
    //TODO: interview-qna.service -> deleteQuestionsByInterviewId
    await this.interviewQuestionService.deleteInterviewQuestionsByInterviewId(
      interviewId,
    );
    const deletedInterview = await this.interviewService.deleteInterview(
      userId,
      interviewId,
    );
    return InterviewUtil.toDeletedInterviewResponse(deletedInterview);
  }
}
