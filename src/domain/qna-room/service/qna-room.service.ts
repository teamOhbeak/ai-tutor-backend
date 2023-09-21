import { Qna } from '@/domain/qna/qna.entity';
import { CreateQnaRoomRequest } from '@/interface/qna-room/request/create-qna-room.request';
import { QnaRoomDeleteResponse } from '@/interface/qna-room/response/qna-room-delete.response';
import { QnaRoomDetailResponse } from '@/interface/qna-room/response/qna-room-detail.response';
import { QnaRoomResponse } from '@/interface/qna-room/response/qna-room.response';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QnaRoom } from '../entity/qna-room.entity';
import { QnaRoomRepository } from '../repository/qna-room-repository';

@Injectable()
export class QnaRoomService {
  constructor(
    // private readonly _configService: ConfigService,
    private qnaRoomRepository: QnaRoomRepository,
  ) { }

  async createQnaRoom(
    qnaRoomRequest: CreateQnaRoomRequest,
  ): Promise<QnaRoomResponse> {
    console.log(qnaRoomRequest);
    const qnaRoom = await new QnaRoom(qnaRoomRequest);
    const result = await this.qnaRoomRepository.createQnaRoom(qnaRoom);
    const response = await result.toResponse();
    // return Promise.resolve(<QnaRoomResponse>{
    //   id: 1,
    //   title: 'this is title.',
    //   username: 'user1',
    //   createdAt: '2023-09-01 13:00',
    // });
    return response;
  }

  async getQnaRooms(): Promise<QnaRoomResponse[]> {
    const result = await this.qnaRoomRepository.findQnaRoomNotDeleted();
    const qnaRoomResponses = result.map((qnaRoom) => qnaRoom.toResponse());
    // add logic for filtering rooms which is deleted
    return qnaRoomResponses;
  }

  async getQnaRoomDetail(): Promise<QnaRoomDetailResponse> {
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
    this.qnaRoomRepository.deleteQnaRoom(id);
    return Promise.resolve(<QnaRoomDeleteResponse>{
      id: id,
      deleted: true,
    });
  }
}
