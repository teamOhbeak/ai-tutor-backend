import { Controller, Get, Param } from '@nestjs/common';
import { PromptService } from '../../domain/prompt/service/prompt.service';
import { QuestionBankService } from '../../domain/questionsBank/service/questionBank.service';

@Controller('promptTest')
export class PromptController {
  constructor(
    private readonly promptService: PromptService,
    private readonly questionsBankService: QuestionBankService,
  ) {}

  @Get()
  async getAiTutorPrompt() {
    const result = await this.promptService.getInterviewQuestionsPrompt();

    return result;
  }
}
