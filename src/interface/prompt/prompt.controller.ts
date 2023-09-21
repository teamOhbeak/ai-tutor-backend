import { Controller, Get, Param } from '@nestjs/common';
import { PromptService } from '../../domain/prompt/service/prompt.service';
import { QuestionBankService } from '../../domain/questionsBank/service/questionBank.service';
import { StackType } from '../interview/response/my-interview-detail.response';
import { QuestionBankRepository } from '../../domain/questionsBank/repository/questionsBank.repository';
import { QuestionStatus } from '../../domain/questionsBank/entity/questionBank.entity';

@Controller('promptTest')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Get()
  async getTestPrompt() {
    const result = await this.promptService.getInterviewQuestionsPrompt();

    return result;
  }
}
