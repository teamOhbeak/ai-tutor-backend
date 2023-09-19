import { Controller, Get } from '@nestjs/common';
import { PromptService } from './prompt.service';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Get()
  async getAiTutorPrompt() {
    return await this.promptService.aiTutorPrompt();
  }
}
