import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class PromptService {
  constructor(private readonly configService: ConfigService) {}

  async aiTutorPrompt() {
    const openAI = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });

    const promptResult = await openAI.chat.completions.create({
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: 'gpt-3.5-turbo',
    });

    return promptResult;
  }
}
