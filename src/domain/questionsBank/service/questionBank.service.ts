import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { PromptService } from '../../prompt/service/prompt.service';
import { QuestionBankRepository } from '../repository/questionsBank.repository';
import { CreateQuestionBankResponse } from '../../../interface/questionBank/response/questionBank.response';
import { StackType } from '../../interview/entity/stack-type.enum';

@Injectable()
export class QuestionBankService {
  constructor(
    private readonly promptService: PromptService,
    private readonly questionBankRepository: QuestionBankRepository,
  ) {}

  async collectingQuestionsFromGpt() {}

  async getQuestions(count: number, stack: StackType) {
    const result = await this.questionBankRepository.getQuestionByStack(
      count,
      stack,
    );

    return result.sort(() => Math.random() - Math.random()).slice(0, count);
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
