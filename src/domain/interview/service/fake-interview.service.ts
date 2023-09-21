import { Injectable } from '@nestjs/common';
import { IInterviewService } from './interview.service.interface';
import { MyInterviewResponse } from 'src/interface/interview/response/my-interview.response';
import {
  InterviewStatus,
  MyInterviewDetailResponse,
} from 'src/interface/interview/response/my-interview-detail.response';
import {
  QuestionResponse,
  QuestionStatus,
  QuestionType,
} from 'src/interface/interview/response/question.response';
import { AnswerResponse } from 'src/interface/interview/response/answer.response';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { InterviewEntity, StackType } from '../entity/interview.entity';

@Injectable()
export class FakeInterviewService implements IInterviewService {
  constructor() {}

  async createInterview(
    userId: number,
    dto: CreateInterviewRequest,
  ): Promise<InterviewEntity> {
    throw new Error('Method not implemented.');
  }

  async getMyInterviews(userId: number): Promise<MyInterviewResponse[]> {
    return Promise.resolve([
      new MyInterviewResponse(1, 'C', '2023-09-01 13:00'),
      new MyInterviewResponse(2, 'C', '2023-09-01 14:00'),
      new MyInterviewResponse(3, 'C', '2023-09-01 15:00'),
      new MyInterviewResponse(4, 'C', '2023-09-01 16:00'),
    ]);
  }

  async getMyInterviewDetail(
    userId: number,
    interviewId: number,
  ): Promise<MyInterviewDetailResponse> {
    return Promise.resolve(<MyInterviewDetailResponse>{
      id: interviewId,
      status: InterviewStatus.COMPLETED,
      stack: StackType.JAVA,
      questionCount: 2,
      maxWait: 1,
      createdAt: '2023-09-19 13:00',
      questions: this.questions,
      userId: userId,
      userName: '이민규',
    });
  }

  questions = <QuestionResponse[]>[
    {
      id: 1,
      type: QuestionType.MAIN_QUESTION,
      question: 'Nest.js에서 DI는 어떻게 하는 겁니까?',
      status: QuestionStatus.COMPLETED,
      startedAt: '2023-09-19 13:01',
      finishedAt: '2023-09-19 13:02',
      answer: <AnswerResponse>{
        contents: '잘 하면 됩니다.',
        createdAt: '2023-09-19 13:03',
      },
      createdAt: '2023-09-19 13:00',
      followUpQuestions: [
        {
          id: 3,
          type: QuestionType.FOLLOWUP_QUESTION,
          question: '어떻게 잘해야 하나요?',
          status: QuestionStatus.WAITING,
          startedAt: '2023-09-19 13:02',
          finishedAt: '2023-09-19 13:02',
          answer: <AnswerResponse>{
            contents: 'nestjs 공식문서 보고 하면 됩니다.',
            createdAt: '2023-09-19 13:02',
          },
          createdAt: '2023-09-19 13:00',
        },
      ],
    },
    {
      id: 2,
      type: QuestionType.MAIN_QUESTION,
      question: 'Nest.js에서 Module은 어떤 역할을 합니까?',
      status: QuestionStatus.COMPLETED,
      startedAt: '2023-09-19 13:03',
      finishedAt: '2023-09-19 13:03',
      answer: null, // Pass한 경우 -> 별도의 속성 추가해도 괜찮을듯
      createdAt: '2023-09-19 13:00',
    },
  ];
}
