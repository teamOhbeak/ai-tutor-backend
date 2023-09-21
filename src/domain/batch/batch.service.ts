import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { PromptService } from '../prompt/service/prompt.service';
import { QuestionBankRepository } from '../questionsBank/repository/questionsBank.repository';
import { QuestionStatus } from '../questionsBank/entity/questionBank.entity';
import data from './fake-data';
import { StackType } from '../interview/entity/stack-type.enum';

@Injectable()
export class BatchService {
  constructor(
    private readonly promptService: PromptService,
    private readonly questionBankRepository: QuestionBankRepository,
  ) {}

  //GPT에서 하루에 한번 데이터 저장
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async questionCollectorFromGpt() {
    try {
      const promptResult =
        await this.promptService.getInterviewQuestionsPrompt();

      for (const key in StackType) {
        promptResult[StackType[key]]?.map(async (question: string) => {
          await this.questionBankRepository.createQuestions({
            question,
            stack: StackType[StackType[key]],
            status: QuestionStatus.APPROVED,
          });
        });
      }
      return 'success';
    } catch (error) {
      return error;
    }
  }

  // 로컬 데이터에서 DB로 저장 fake-data.ts
  async questionCollectorFromLocalData() {
    for (const key in StackType) {
      data[StackType[key]]?.map(async (question: string) => {
        await this.questionBankRepository.createQuestions({
          question,
          stack: StackType[StackType[key]],
          status: QuestionStatus.APPROVED,
        });
      });
    }
    return 'success';
  }
}
