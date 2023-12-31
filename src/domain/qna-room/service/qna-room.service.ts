import { Qna } from '@/domain/qna/entity/qna.entity';
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
  ) {}

  async createQnaRoom(
    qnaRoomRequest: CreateQnaRoomRequest,
  ): Promise<QnaRoomResponse> {
    console.log(qnaRoomRequest);
    const qnaRoom = await new QnaRoom(qnaRoomRequest);
    const result = await this.qnaRoomRepository.createQnaRoom(qnaRoom);
    const response = await result.toResponse();
    return response;
  }

  async getQnaRooms(): Promise<QnaRoomResponse[]> {
    const result = await this.qnaRoomRepository.findQnaRoomNotDeleted();
    const qnaRoomResponses = result.map((qnaRoom) => qnaRoom.toResponse());
    return qnaRoomResponses;
  }

  async getQnaRoomDetail(id: number): Promise<QnaRoomDetailResponse> {
    const found = await this.qnaRoomRepository.findQnaRoomWithQnas(id);
    const qnaRoomDetailResponse = found.toDetailResponse();
    return qnaRoomDetailResponse;
  }

  async deleteQnaRoom(id: number): Promise<QnaRoomDeleteResponse> {
    console.log('room id' + id);
    this.qnaRoomRepository.deleteQnaRoom(id);
    return Promise.resolve(<QnaRoomDeleteResponse>{
      id: id,
      deleted: true,
    });
  }
}
