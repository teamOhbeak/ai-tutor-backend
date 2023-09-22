import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InterviewQuestionsServiceImpl } from '@/domain/interviewQuestions/service/interviewQuestions.service';
import { InterviewQuestionDTO } from './response/InterviewQuestionDTO';
import { AnswerRequestDto } from './request/answer.resquest';
import { followUpQuestionResponse } from './response/followUpQuestionResponse';
import { AnswerResponse } from './response/answer.response';

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
  @ApiOkResponse({
    description: '메인 질문 한번에 여러개 가져오기',
    type: [InterviewQuestionDTO],
  })
  async getQuestions(
    @Param() params,
    @Body() body: { answer: string },
  ): Promise<InterviewQuestionDTO> {
    const interviewId = params.interviewId; // interviewId 파라미터 추출
    return await this.interviewQuestionsService.getQuestions(interviewId);
  }

  @Post('answer')
  // @ApiCreatedResponse()
  @ApiOkResponse({
    description:
      '대답 제출, 대답할때 해당 대답이 메인 질문인지 꼬리 질문인지 요청 request필요',
    type: [AnswerResponse],
  })
  async submitAnswer(
    @Param() params,
    @Body() answerRequestDto: AnswerRequestDto,
  ): Promise<AnswerResponse> {
    // questionId와 answerRequestDto를 서비스로 전달
    const interviewId = params.interviewId;
    return await this.interviewQuestionsService.submitAnswer(
      interviewId,
      answerRequestDto,
    );
  }

  @Patch(':questionId/answer')
  @ApiNoContentResponse()
  async submitPassAnswer(
    @Param('interviewId') interviewId: number,
    @Param('questionId') questionId: number,
  ): Promise<void> {}
}
