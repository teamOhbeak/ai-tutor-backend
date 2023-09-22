import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InterviewQuestionRepository } from '../repository/interview-question.repository';
import { InterviewQuestionEntity } from '../entity/interview-question.entity';
import { InterviewQuestion } from '@/domain/prompt/service/prompt.service';
import { DeleteResult } from 'typeorm';

@Injectable()
export class InterviewQuestionService {
  constructor(
    private readonly interviewQuestionRepository: InterviewQuestionRepository,
  ) {}

  async saveInterviewQuestions(
    questions: InterviewQuestionEntity[],
  ): Promise<InterviewQuestionEntity[]> {
    return await this.interviewQuestionRepository.saveQuestions(questions);
  }

  async deleteInterviewQuestionsByInterviewId(interviewId: number)
  : Promise<number | null> {
    const result = await this.interviewQuestionRepository.delete({
      interviewId: interviewId
    });

    if (!result.affected) {
      throw new HttpException({error: '인터뷰 질문을 삭제하는 중 오류가 발생했습니다.'}, HttpStatus.OK)
    }
    return result.affected;
  }
}
