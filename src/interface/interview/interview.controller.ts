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
import { MyInterviewResponse } from './response/my-interview.response';
import {
  InterviewStatus,
  MyInterviewDetailResponse,
} from './response/my-interview-detail.response';
import { CreateInterviewRequest } from './request/create-interview.request';
import { IInterviewService } from 'src/domain/interview/service/interview.service.interface';
import { FakeInterviewService } from 'src/domain/interview/service/fake-interview.service';
import { UserResponse } from './response/user.response';

@Controller('api/interviews')
@ApiTags('InterviewController')
export class InterviewController {
  private readonly interviewService: IInterviewService;
  constructor() {
    this.interviewService = new FakeInterviewService();
  }

  @Post()
  @ApiCreatedResponse({
    description: '인터뷰 생성',
    type: MyInterviewDetailResponse,
  })
  async createInterview(
    @Body() dto: CreateInterviewRequest,
  ): Promise<MyInterviewDetailResponse> {
    const user = new UserResponse();
    user.userName = '이민규';
    return new MyInterviewDetailResponse(
      1,
      InterviewStatus.COMPLETED,
      '2023-09-01 13:00',
      [],
      user  
    );
  }

  @Get()
  @ApiOkResponse({ description: '면접 목록 조회', type: [MyInterviewResponse] })
  async getMyInterviews(): Promise<MyInterviewResponse[]> {
    const userId = 1;
    return this.interviewService.getMyInterviews(userId);
  }

  @Get(':interviewId')
  @ApiOkResponse({ description: '면접 상세', type: MyInterviewDetailResponse })
  async getMyInterviewDetail(
    @Param('interviewId') interviewId: number,
  ): Promise<MyInterviewDetailResponse> {
    const userId = 1;
    const user = new UserResponse();
    user.userName = '이민규';
    return this.interviewService.getMyInterviewDetail(userId, interviewId);
  }

  @Put(':interviewId')
  @ApiNoContentResponse({ description: '면접 취소' })
  async cancelInterview(
    @Param('interviewId') interviewId: number,
  ): Promise<any> {
    return null;
  }

  @Delete(':interviewId')
  @ApiOkResponse({ description: '면접 삭제' })
  async deleteInterview(
    @Param('interviewId') interviewId: number,
  ): Promise<any> {
    return null;
  }
}
