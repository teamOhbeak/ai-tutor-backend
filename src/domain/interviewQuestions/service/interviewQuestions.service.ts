import { Injectable } from '@nestjs/common';
import { InterviewQuestionsService } from './interviewQuestions.interface';
import { InterviewQuestionsRepository } from '../repository/interviewQuestions.repository.';
import { allQuestionResponse } from '@/interface/interview-qna/response/allQuestion.response';
import { InterviewQuestionsRepositoryImpl } from '../repository/interviewQuestion.repository.interface';
import { PromptService } from '@/domain/prompt/service/prompt.service';
import { InterviewAnswer } from '@/domain/interviewAnswer/entity/interviewAnswer.entity';
import { InterviewAnswersRepository } from '@/domain/interviewAnswer/repository/interviewAnswer.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InterviewQuestionsServiceImpl
  implements InterviewQuestionsService
{
  constructor(
    private readonly interviewQuestionsRepository: InterviewQuestionsRepositoryImpl,
    private readonly interviewAnswersRepository:  InterviewAnswersRepository,
    private readonly promptService: PromptService,
  ) {}

  public async getQuestions(
    questionId: number,
    stack: string,
  ): Promise<allQuestionResponse[]> {
    console.log('서비스');

    try {
      console.log('레포가기전');

      const repo = await this.interviewQuestionsRepository.getQuestions(
        questionId,
        stack,
      );
      console.log('레포간 후');

      console.log(repo);
      return [
        {
          questionId: 1,
          questionText: 'zzz',
        },
      ];
    } catch {
      throw new Error('Method not implemented.');
    }
  }

  async submitAnswer(answer: string) {

    try {
    const gptRes = await this.promptService.submitAnswer(answer);

    console.error('???'); // 에러 로깅 추가

    const interviewAnswer = new InterviewAnswer(gptRes, 1);
    // interviewAnswer.answer = answer;
    // interviewAnswer.questionId = 1; // 임시로 1번으로 설정
    await this.interviewAnswersRepository.save(
    this.interviewAnswersRepository.create(interviewAnswer));
    
    console.error('!!!'); // 에러 로깅 추가

    return gptRes;

    }catch (error) {
      console.error('Service Error in submitAnswer :', error); // 에러 로깅 추가
    throw new Error('Method not implemented.');
    }
  }
}
