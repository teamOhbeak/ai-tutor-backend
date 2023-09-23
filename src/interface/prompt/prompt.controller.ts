import { Controller, Get, Param, Query } from '@nestjs/common';
import { PromptService } from '../../domain/prompt/service/prompt.service';
import { BatchService } from '../../domain/batch/batch.service';
import { ApiResponse } from '@nestjs/swagger';
import { FakeQuestionBankService } from '../../domain/questionsBank/service/fake-questionBank.service';
import { StackType } from '../../domain/interview/entity/stack-type.enum';
import { QuestionBankService } from '../../domain/questionsBank/service/questionBank.service';
import { InterviewQuestionAndAnswerRepository } from '../../domain/interview-question/repository/interview-question-and-answer.repository';
import { InterviewQuestionAndAnswerEntity } from '../../domain/interview-question/entity/interview-question-and-answer.entity';
import { AnswerStatus } from '../../domain/interview-question/entity/answer-status.enum';

@Controller('promptTest')
export class PromptController {
  constructor(
    private readonly promptService: PromptService,
    private readonly questionBankService: QuestionBankService,
    private readonly InterviewQuestionAndAnswerRepository: InterviewQuestionAndAnswerRepository,
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
  async get(@Query('stack') stack: StackType, @Query('count') count: number) {
    return await this.questionBankService.getQuestions(count, stack);
  }

  @Get('22')
  @ApiResponse({
    status: 200,
    type: String,
  })
  async getwhat() {
    // const data: InterviewQuestionAndAnswerEntity = {
    //   id: 1,
    //   userId: 1,
    //   interviewId: 1,
    //   mainQuestionId: 1,
    //   questionText: 'hello',
    //   answerText: '',
    //   status: 1,
    //   isPass: AnswerStatus.N,
    // };

    // await this.InterviewQuestionAndAnswerRepository.save(data);

    // return 'hello';
    // return await this.questionBankService.getQuestions(count, stack);
  }
}
