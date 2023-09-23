import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { HttpException, Injectable } from '@nestjs/common';
import { InterviewEntity } from '../entity/interview.entity';
import { InterviewRepository } from '../repository/interview.repository';
import { InterviewStatus } from '../entity/insterview-status.enum';
import { InterviewQuestionAndAnswerRepository } from '../../interview-question/repository/interview-question-and-answer.repository';
import { InterviewQuestionAndAnswerEntity } from '../../interview-question/entity/interview-question-and-answer.entity';
@Injectable()
export class InterviewService {
  constructor(
    private readonly interviewRepository: InterviewRepository,
    private readonly interviewQuestionAndAnswerRepository: InterviewQuestionAndAnswerRepository,
  ) {}

  async createInterview(
    userId: number,
    dto: CreateInterviewRequest,
  ): Promise<InterviewEntity> {
    const interview = InterviewEntity.CreateInterview(userId, dto);
    return await this.interviewRepository.save(interview);
  }

  async getMyCompletedInterviews(userId: number): Promise<InterviewEntity[]> {
    return await this.interviewRepository.getInterviewsByUserIdAndStatus(
      userId,
      InterviewStatus.DONE,
    );
  }

  async findInterview(userId: number, interviewId: number) {
    const interview = await this.interviewRepository.getInterviewDetailById(
      interviewId,
      userId,
    );

    if (!interview)
      throw new HttpException({ error: '면접정보를 찾을 수 없습니다.' }, 404);

    return interview;
  }

  async cancelInterview(
    userId: number,
    interviewId: number,
  ): Promise<InterviewEntity> {
    const interview = await this.findInterview(userId, interviewId);
    interview.cancel(userId);
    return await this.interviewRepository.save(interview);
  }

  async createData(
    data: InterviewQuestionAndAnswerEntity[],
  ): Promise<InterviewQuestionAndAnswerEntity[]> {
    return await this.interviewQuestionAndAnswerRepository.save(data);
  }
}
