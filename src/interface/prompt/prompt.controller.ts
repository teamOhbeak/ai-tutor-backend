import { Controller, Get, Param, Query } from '@nestjs/common';
import { PromptService } from '../../domain/prompt/service/prompt.service';
import { BatchService } from '../../domain/batch/batch.service';
import { ApiResponse } from '@nestjs/swagger';
import { FakeQuestionBankService } from '../../domain/questionsBank/service/fake-questionBank.service';
import { StackType } from '../../domain/interview/entity/stack-type.enum';

@Controller('promptTest')
export class PromptController {
  constructor(
    private readonly promptService: PromptService,
    private readonly batchService: BatchService,
    private readonly fakeQuestionBankService: FakeQuestionBankService,
  ) {}

  @Get('saveLocalDataToDB')
  @ApiResponse({
    status: 200,
    description: '로컬에서 가져온 GPT 결과값을 DB에 저장합니다.(GPT 사용안함)',
    type: String,
  })
  async getTestPrompt() {
    const result = await this.batchService.questionCollectorFromLocalData();

    return result;
  }

  @Get('randomStack')
  @ApiResponse({
    status: 200,
    description: '로컬에서 가져온 GPT 결과값을 DB에 저장합니다.(GPT 사용안함)',
    type: String,
  })
  async getQuestionsByStack(
    @Query('stack') stack: StackType,
    @Query('count') count: number,
  ) {
    const result = await this.fakeQuestionBankService.getFakeQuestionByStack(
      count,
      stack,
    );

    console.log(result);

    return result;
  }
}
