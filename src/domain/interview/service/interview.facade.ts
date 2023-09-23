import { Injectable } from '@nestjs/common';
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
import { QuestionBankService } from '../../questionsBank/service/questionBank.service';

@Injectable()
export class InterviewFacade {
  // private readonly questionBankService: IFakeQuestionBankService;
  constructor(
    private readonly interviewService: InterviewService,
    private readonly interviewQuestionService: InterviewQuestionService,
    private readonly questionBankService: QuestionBankService,
  ) {
    // this.questionBankService = new FakeQuestionBankService();
  }

  async createInterview(
    userId: number,
    dto: CreateInterviewRequest,
  ): Promise<CreateInterviewResponse> {
    console.log(`dto: ${JSON.stringify(dto)}`);
    const interviewRoom = await this.interviewService.createInterview(
      userId,
      dto,
    );

    const questions = await this.questionBankService.getQuestions(
      dto.questionCount,
      dto.stack,
    );

    // console.log(`questions: ${JSON.stringify(questions)}`);

    // 새로 만든 테이블에 형변환
    const interviewQuestions = InterviewQuestionUtil.generateInterviewQuestion(
      interviewRoom.id,
      questions,
    );

    // 전달후 저장
    // /질문 서비스
    //

    interviewRoom.questions = await this.interviewService.createData(
      interviewQuestions,
    );

    // interviewRoom.questions =
    //   await this.interviewQuestionService.saveInterviewQuestions(
    //     interviewQuestions,
    //   );

    console.log(`questions: ${JSON.stringify(interviewRoom.questions)}`);

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
    const interviewResponse =
      InterviewUtil.toInterviewDetailResponse(interview);
    interviewResponse.questions =
      await this.interviewQuestionService.getInterviewQuestions(interviewId);

    return interviewResponse;
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
}
