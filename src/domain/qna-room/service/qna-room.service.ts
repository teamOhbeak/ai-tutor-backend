import { CreateQnaRoomRequest } from '@/interface/qna-room/request/create-qna-room.request';
import { QnaRoomDeleteResponse } from '@/interface/qna-room/response/qna-room-delete.response';
import { QnaRoomDetailResponse } from '@/interface/qna-room/response/qna-room-detail.response';
import { QnaRoomResponse } from '@/interface/qna-room/response/qna-room.response';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QnaRoomService {
  constructor(private readonly configService: ConfigService) { }

  async createQnaRoom(
    qnaRoomRequest: CreateQnaRoomRequest,
  ): Promise<QnaRoomResponse> {
    console.log(qnaRoomRequest);
    return Promise.resolve(<QnaRoomResponse>{
      id: 1,
      title: 'this is title.',
      username: 'user1',
      createdAt: '2023-09-01 13:00',
    });
  }

  async getQnaRooms(): Promise<QnaRoomResponse[]> {
    // add logic for filtering rooms which is deleted
    return [];
  }

  async getQnaRoomDetail(): Promise<QnaRoomDetailResponse> {
    // add logic for filtering rooms which is deleted
    return Promise.resolve(<QnaRoomDetailResponse>{
      id: 1,
      title: 'this is title.',
      username: 'user1',
      createdAt: '2023-09-01 13:00',
      qnas: [],
    });
  }

  async deleteQnaRoom(id: number): Promise<QnaRoomDeleteResponse> {
    // add logic for filtering rooms which is deleted
    console.log('room id' + id);
    return Promise.resolve(<QnaRoomDeleteResponse>{
      id: id,
      deleted: true,
    });
  }
}
