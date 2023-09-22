import { Injectable } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewQuestionService } from '@/domain/interview-question/service/interview-question.service';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { InterviewEntity } from '../entity/interview.entity';
import { IFakeQuestionBankService } from '@/domain/questionsBank/service/fake-questionBank.interface';
import { FakeQuestionBankService } from '@/domain/questionsBank/service/fake-questionBank.service';
import { InterviewQuestionUtil } from '../utils/interview-question.util';
import { CreateInterviewResponse } from '@/interface/interview/response/create-interview.response';

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
    const interviewRoom = InterviewEntity.CreateInterview(userId, dto);

    const questions = await this.questionBankService.getFakeQuestions(
      dto.questionCount,
    );
    const interviewQuestions = InterviewQuestionUtil.generateInterviewQuestion(
      interviewRoom.id,
      questions,
    );
    interviewRoom.questions =
      await this.interviewQuestionService
        .saveInterviewQuestions(interviewQuestions);

    return InterviewQuestionUtil.toCreateInterviewResponse(interviewRoom);
  }
}
