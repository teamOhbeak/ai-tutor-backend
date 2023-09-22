import { Module } from '@nestjs/common';
import { PromptService } from './service/prompt.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PromptService],
  //   exports: [PromptService],
})
export class PromptModule {}
