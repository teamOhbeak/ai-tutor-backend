import { InterviewQuestionEntity } from '@/domain/interview-question/entity/interview-question.entity';
import { InterviewQuestionService } from '@/domain/interview-question/service/interview-question.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/interviews/:interviewId/questions')
@ApiTags('InterviewQnaController')
export class InterviewQnaController {
  constructor(
    private readonly interviewQuestionService: InterviewQuestionService,
  ) {}
  @Post()
  @ApiCreatedResponse()
  async createQuestion(
    @Param('interviewId') interviewId: number,
    @Body() params: any,
  ): Promise<any> {
    return { id: interviewId };
  }

  @Get()
  @ApiOkResponse()
  async getQuestions(
    @Param('interviewId') interviewId: number,
  ): Promise<InterviewQuestionEntity[]> {
    return await this.interviewQuestionService.getInterviewQuestions(
      interviewId,
    );
  }

  @Post(':questionId/answer')
  @ApiCreatedResponse()
  async submitAnswer(
    @Param('interviewId') interviewId: number,
    @Param('questionId') questionId: number,
    @Body() dto: any,
  ): Promise<any> {
    return { id: interviewId, questionId: questionId };
  }

  @Patch(':questionId/answer')
  @ApiNoContentResponse()
  async submitPassAnswer(
    @Param('interviewId') interviewId: number,
    @Param('questionId') questionId: number,
  ): Promise<void> {}
}
