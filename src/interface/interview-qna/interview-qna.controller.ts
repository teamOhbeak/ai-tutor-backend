import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { followUpQuestionResponse } from './response/allQuestion.response';
import { InterviewQuestionsService } from '@/domain/interviewQuestions/service/interviewQuestions.interface';
import { InterviewQuestionsServiceImpl } from '@/domain/interviewQuestions/service/interviewQuestions.service';
import { InterviewQuestionDTO } from './response/InterviewQuestionDTO';
import { AnswerRequestDto } from './request/answer.resquest';

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
  async getQuestions(@Param() params,
  @Body() body: { answer: string }): Promise<InterviewQuestionDTO> {
    const interviewId = params.interviewId; // interviewId 파라미터 추출
    return await this.interviewQuestionsService.getQuestions(interviewId);
  }

  @Post(':questionId/answer')
  @ApiCreatedResponse()
  async submitAnswer(
    @Param('questionId') questionId: number,
    @Body() answerRequestDto: AnswerRequestDto,
  ): Promise<followUpQuestionResponse> {
    // questionId와 answerRequestDto를 서비스로 전달
    return await this.interviewQuestionsService.submitAnswer(questionId,answerRequestDto);
  }
  

  @Patch(':questionId/answer')
  @ApiNoContentResponse()
  async submitPassAnswer(
    @Param('interviewId') interviewId: number,
    @Param('questionId') questionId: number,
  ): Promise<void> {}
}
