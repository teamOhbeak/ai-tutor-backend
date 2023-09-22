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
  async getQuestions(@Param() params): Promise<InterviewQuestionDTO[]> {
    const interviewId = params.interviewId; // interviewId 파라미터 추출
    return await this.interviewQuestionsService.getQuestions(interviewId);
  }

  @Post(':questionId/answer')
  @ApiCreatedResponse()
  async submitAnswer(
    @Param('questionId') questionId: number, // questionId 파라미터를 가져옵니다.
    @Body() body: { answer: string },
  ): Promise<followUpQuestionResponse> {
    const { answer } = body;
    return await this.interviewQuestionsService.submitAnswer(
      questionId,
      answer,
    );
  }

  @Patch(':questionId/answer')
  @ApiNoContentResponse()
  async submitPassAnswer(
    @Param('interviewId') interviewId: number,
    @Param('questionId') questionId: number,
  ): Promise<void> {}
}
