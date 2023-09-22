import { Injectable } from '@nestjs/common';
import { QuestionBankResponse } from '../../../interface/questionBank/response/questionBank.response';
import { IFakeQuestionBankService } from './fake-questionBank.interface';
import { QuestionStatus } from '../entity/questionBank.entity';
import { StackType } from '@/domain/interview/entity/stack-type.enum';
import data from '../../batch/fake-data';

@Injectable()
export class FakeQuestionBankService implements IFakeQuestionBankService {
  constructor() {}

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

  async getFakeQuestionByStack(
    count: number,
    stack: StackType,
  ): Promise<QuestionBankResponse[]> {
    console.log(data, stack);
    const randomResult = data[stack]
      .sort(() => Math.random() - Math.random())
      .slice(0, count);
    console.log(randomResult);

    const exportData = [];

    randomResult.map((question, index) => {
      const randomTime = Math.floor(Math.random() * 24);
      exportData.push(
        new QuestionBankResponse(
          index + 1,
          stack,
          question,
          QuestionStatus.PENDING,
          new Date(new Date().setHours(randomTime)),
          null,
        ),
      );
    });

    console.log(exportData);

    return Promise.resolve(exportData);
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
