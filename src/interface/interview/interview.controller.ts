import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MyInterviewDetailResponse } from './response/my-interview-detail.response';
import { CreateInterviewRequest } from './request/create-interview.request';
import { UserResponse } from './response/user.response';
import { InterviewService } from '@/domain/interview/service/interview.service';
import { MyInterviewResponse } from './response/my-interview.response';
import { AuthService } from '@/domain/auth/service/auth.service';
import { CreateInterviewResponse } from './response/create-interview.response';
import { InterviewEntity } from '@/domain/interview/entity/interview.entity';
import { InterviewFacade } from '@/domain/interview/service/interview.facade';

@Controller('api/interviews')
@ApiTags('InterviewController')
export class InterviewController {
  constructor(
    private readonly authService: AuthService,
    private readonly interviewFacade: InterviewFacade,
    //TODO: interviewFacade get요청 추가 시 삭제
    private readonly interviewService: InterviewService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: '인터뷰 생성', // 입장한 면접 id
    type: MyInterviewDetailResponse,
  })
  async createInterview(
    @Body() dto: CreateInterviewRequest,
  ): Promise<CreateInterviewResponse> {
    const userId = await this.authService.getAuth().userId;
    const response = await this.interviewFacade.createInterview(userId, dto);
    return response;
  }

  @Get()
  @ApiOkResponse({ description: '면접 목록 조회', type: [MyInterviewResponse] })
  async getMyInterviews(): Promise<InterviewEntity[]> {
    const userId = 1;
    const interviews = await this.interviewService.getMyCompletedInterviews(userId);
    return interviews;
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

  @Put(':interviewId') // 면접 진행 중 나가기
  @ApiNoContentResponse({ description: '면접 취소' })
  async cancelInterview(
    @Param('interviewId') interviewId: number,
  ): Promise<any> {
    return null;
  }

  @Delete(':interviewId') // 면접 목록 리스트 삭제
  @ApiOkResponse({ description: '면접 삭제' })
  async deleteInterview(
    @Param('interviewId') interviewId: number,
  ): Promise<any> {
    return null;
  }
}
