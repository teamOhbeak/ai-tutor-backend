import { Controller, Get, Param } from '@nestjs/common';
import { PromptService } from '../../domain/prompt/service/prompt.service';
import { QuestionsBankService } from '../../domain/questionsBank/service/questionsBank.service';

@Controller('promptTest')
export class PromptController {
  constructor(
    private readonly promptService: PromptService,
    private readonly questionsBankService: QuestionsBankService,
  ) {}

  @Get()
  async getAiTutorPrompt() {
    const result = await this.promptService.getInterviewQuestionsPrompt();

    return result;
  }
}
