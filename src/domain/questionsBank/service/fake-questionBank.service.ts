import { Injectable } from '@nestjs/common';
import { PromptService } from '../../prompt/service/prompt.service';
import { QuestionBankRepository } from '../repository/questionsBank.repository';
import {
  QuestionBankResponse,
} from '../../../interface/questionBank/response/questionBank.response';
import { IFakeQuestionBankService } from './fake-questionBank.interface';
import { QuestionStatus } from '../entity/questionBank.entity';
import { StackType } from '@/domain/interview/entity/interview.entity';

@Injectable()
export class FakeQuestionBankService implements IFakeQuestionBankService {
  constructor(
    private readonly promptService: PromptService,
    private readonly questionBankRepository: QuestionBankRepository,
  ) {}

  async getFakeQuestions(count: number): Promise<QuestionBankResponse[]> {
    return Promise.resolve([
      new QuestionBankResponse(
        1,
        StackType.JAVA,
        'JAVA에서는 멀티쓰레딩은 어떻게 해야할까요',
        QuestionStatus.APPROVED,
        new Date('2023-09-12 15:01'),
        null,
      ),
      new QuestionBankResponse(
        2,
        StackType.NESTJS,
        'Nest.js에서 DI는 어떻게 하는 겁니까?',
        QuestionStatus.PENDING,
        new Date('2023-09-19 13:01'),
        null,
      ),
    ]);
  }
}

export enum QuestionType {
  JAVA = 0,
  JAVASCRIPT = 1,
  KOTLIN = 2,
  REACTJS = 3,
  NEXTJS = 4,
  NODEJS = 5,
  NESTJS = 6,
  SPRING = 7,
  CS = 8,
}
