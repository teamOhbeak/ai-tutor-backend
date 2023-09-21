import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MyInterviewDetailResponse } from './response/my-interview-detail.response';
import { CreateInterviewRequest } from './request/create-interview.request';
import { createInterview } from '../../domain/interview/service/interview.model';
import { InterviewService } from '@/domain/interview/service/interview.service';
import { MyInterviewResponse } from './response/my-interview.response';

@Controller('api/interviews')
@ApiTags('InterviewController')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post()
  @ApiCreatedResponse({
    description: '인터뷰 생성',
    type: MyInterviewDetailResponse,
  })
  async createInterview(
    @Body() request: CreateInterviewRequest,
  ): Promise<MyInterviewDetailResponse> {
    // dto -> model
    const interviewInfoResult = createInterview(request);
    return await this.interviewService.createInterview(interviewInfoResult);
  }

  @Get()
  @ApiOkResponse({ description: '면접 목록 조회', type: [MyInterviewResponse] })
  async getMyInterviews(): Promise<MyInterviewResponse[]> {
    const userId = 1;
    await this.interviewService.getMyInterviews(userId);
    return this.interviewService.getMyInterviews(userId);
  }

  // @Get(':interviewId')
  // @ApiOkResponse({ description: '면접 상세', type: MyInterviewDetailResponse })
  // async getMyInterviewDetail(
  //   @Param('interviewId') interviewId: number,
  // ): Promise<MyInterviewDetailResponse> {
  //   const userId = 1;
  //   return this.interviewService.getMyInterviewDetail(userId, interviewId);
  // }

  // @Put(':interviewId') // 면접 진행 중 나가기
  // @ApiNoContentResponse({ description: '면접 취소' })
  // async cancelInterview(
  //   @Param('interviewId') interviewId: number,
  // ): Promise<any> {
  //   return null;
  // }

  // @Delete(':interviewId') // 면접 목록 리스트 삭제
  // @ApiOkResponse({ description: '면접 삭제' })
  // async deleteInterview(
  //   @Param('interviewId') interviewId: number,
  // ): Promise<any> {
  //   return null;
  // }
}
