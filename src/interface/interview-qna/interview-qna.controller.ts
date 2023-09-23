import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InterviewQuestionService } from '../../domain/interview-question/service/interview-question.service';
import { AnswerRequest } from './request/answer.request';
import { QuestionStateResponse } from './response/question-state.response';

@Controller('api/interviews/:interviewId/questions')
@ApiTags('InterviewQnaController')
export class InterviewQnaController {
  // @Post()
  // @ApiCreatedResponse()
  // async createQuestion(
  //   @Param('interviewId') interviewId: number,
  //   @Body() params: any,
  // ): Promise<any> {
  //   return { id: interviewId };
  // }
  /**
   *
   */
  constructor(
    private readonly interviewQuestionService: InterviewQuestionService,
  ) {}
  @Get()
  @ApiOkResponse()
  async getQuestions(@Param('interviewId') interviewId: number): Promise<any> {
    return this.interviewQuestionService.getNextQuestionInfo(interviewId);
  }

  @Post(':questionId/answer')
  @ApiCreatedResponse()
  async submitAnswer(
    @Param('interviewId') interviewId: number,
    @Param('questionId') questionId: number,
    @Body() dto: AnswerRequest,
  ): Promise<QuestionStateResponse> {
    return await this.interviewQuestionService.saveAnswer(
      interviewId,
      questionId,
      dto.answerText,
    );
  }

  @Patch(':questionId/answer')
  @ApiNoContentResponse()
  async submitPassAnswer(
    @Param('interviewId') interviewId: number,
    @Param('questionId') questionId: number,
  ): Promise<void> {}
}
