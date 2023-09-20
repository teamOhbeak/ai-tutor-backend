import { CreateQuestionRequest } from '@/interface/qna-room-qna/request/create-question-request';
import { QnaResponse } from '@/interface/qna-room-qna/response/qna-response';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QnaService {
  constructor(private readonly configService: ConfigService) { }

  async createQna(qnaRequest: CreateQuestionRequest): Promise<QnaResponse> {
    console.log(qnaRequest);
    return Promise.resolve(<QnaResponse>{
      id: 1,
      sequence: 1,
      question: 'this is question.',
      answer: 'this is answer.',
    });
  }

  async getQnas(roomId: number): Promise<QnaResponse[]> {
    console.log('roomId: ' + roomId);
    return Promise.resolve([
      new QnaResponse(1, 1, 'this is question1.', 'this is answer1.'),
      new QnaResponse(2, 2, 'this is question2.', 'this is answer2.'),
    ]);
  }
}
