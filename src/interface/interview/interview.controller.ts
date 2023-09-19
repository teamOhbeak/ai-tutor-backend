import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MyInterviewResponse } from "./response/my-interview.response";
import { MyInterviewDetailResponse } from "./response/my-interview-detail.response";
import { CreateInterviewRequest } from "./request/create-interview.request";

@Controller('api/interviews')
@ApiTags('InterviewController')
export class InterviewController {

  constructor() {}

  @Post()
  @ApiCreatedResponse({ description: '인터뷰 생성', type: MyInterviewDetailResponse })
  async createInterview(
    @Body() dto: CreateInterviewRequest
  )
  : Promise<MyInterviewDetailResponse> {
    return new MyInterviewDetailResponse(1, 'U', '2023-09-01 13:00', []);
  }
  
  @Get()
  @ApiOkResponse({ description: '면접 목록 조회', type: [MyInterviewResponse]})
  async getMyInterviews()
  : Promise<MyInterviewResponse[]> {
    const userId = '';
    return <MyInterviewResponse[]>[
      new MyInterviewResponse(1, 'U', '2023-09-01 13:00'),
      new MyInterviewResponse(2, 'U', '2023-09-02 18:30'),
    ];
  }

  @Get(':interviewId')
  @ApiOkResponse({ description: '면접 상세', type: MyInterviewDetailResponse})
  async getMyInterviewDetail(
    @Param('interviewId') interviewId: number)
  : Promise<MyInterviewDetailResponse> {
    const userId = '';
    return new MyInterviewDetailResponse(interviewId, 'U', '2023-09-01 13:00', []);
  }

}