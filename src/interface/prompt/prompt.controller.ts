import { Controller, Get, Param } from '@nestjs/common';
import { PromptService } from '../../domain/prompt/service/prompt.service';
import { QuestionBankService } from '../../domain/questionsBank/service/questionBank.service';
import { StackType } from '../interview/response/my-interview-detail.response';
import { QuestionBankRepository } from '../../domain/questionsBank/repository/questionsBank.repository';
import { QuestionStatus } from '../../domain/questionsBank/entity/questionBank.entity';
import { BatchService } from '../../domain/batch/batch.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('promptTest')
export class PromptController {
  constructor(
    private readonly promptService: PromptService,
    private readonly batchService: BatchService,
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
}
