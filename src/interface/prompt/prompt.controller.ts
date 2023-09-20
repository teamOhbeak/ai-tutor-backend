import { Controller, Get, Param } from '@nestjs/common';
import { PromptService } from '../../domain/prompt/service/prompt.service';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Get()
  async getAiTutorPrompt(@Param('prompt') prompt: string) {
    return await this.promptService.aiTutorPrompt();
  }
}
