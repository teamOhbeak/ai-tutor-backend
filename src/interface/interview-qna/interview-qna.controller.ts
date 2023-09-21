import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { allQuestionResponse } from './response/allQuestion.response';
import { InterviewQuestionsService } from '@/domain/interviewQuestions/service/interviewQuestions.interface';
import { InterviewQuestionsServiceImpl } from '@/domain/interviewQuestions/service/interviewQuestions.service';

@Controller('api/interviews/:interviewId/questions')
@ApiTags('InterviewQnaController')
export class InterviewQnaController {
  constructor(
    private readonly interviewQuestionsService: InterviewQuestionsServiceImpl,
  ) {}

  // @Post()
  // @ApiCreatedResponse()
  // async createQuestion(
  //   @Param('interviewId') interviewId: number,
  //   // @Body() params: any,
  // ): Promise<allQuestionResponse> {
  //   return { id: interviewId };
  // }

  @Get()
  @ApiOkResponse()
  async getQuestions(
    @Param('questionId') questionId: number,
    @Param('stack') stack: string,
  ): Promise<allQuestionResponse[]> {
    await this.interviewQuestionsService.getQuestions(questionId, stack);

    return [
      {
        questionId: 1,
        questionText: 'zzz',
      },
    ];
  }

  @Post(':questionId/answer')
  @ApiCreatedResponse()
  async submitAnswer(
    @Param('interviewId') interviewId: number,
    @Param('questionId') questionId: number,
    @Body() dto: any,
  ): Promise<any> {
    return {
      id: interviewId,
      questionId: questionId,
    };
  }

  @Patch(':questionId/answer')
  @ApiNoContentResponse()
  async submitPassAnswer(
    @Param('interviewId') interviewId: number,
    @Param('questionId') questionId: number,
  ): Promise<void> {}
}
