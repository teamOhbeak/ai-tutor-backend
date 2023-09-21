import { CreateQuestionRequest } from '@/interface/qna-room-qna/request/create-question-request';
import { QnaResponse } from '@/interface/qna-room-qna/response/qna-response';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QnaRepository } from '../repository/qna-repository';
import { QnaRoomRepository } from '@/domain/qna-room/repository/qna-room-repository';
import { Qna } from '../entity/qna.entity';

@Injectable()
export class QnaService {
  constructor(
    private qnaRepository: QnaRepository,
    private qnaRoomRepository: QnaRoomRepository,
  ) { }

  async createQna(qnaRequest: CreateQuestionRequest): Promise<QnaResponse> {
    console.log(qnaRequest);
    const qnaRoom = await this.qnaRoomRepository.findQnaRoomWithQnas(
      qnaRequest.roomId,
    );
    console.log('qnaRoomId: ' + qnaRoom.id);

    const qnaList = qnaRoom.qnas;
    let sequence: number;

    if (qnaRoom == null || qnaRoom === undefined) {
      throw new Error('qnaRoom is null');
    }

    if (!qnaList || qnaList.length === 0) {
      sequence = 0;
    } else {
      const maxSequence = Math.max(...qnaList.map((qna) => qna.sequence));
      sequence = maxSequence + 1;
    }

    /* TODO: answer
    아래 answer에 프롬프트 응답값 받아야함. 
    */
    const answer = 'this is answer.';
    const qna = new Qna(qnaRequest.question, answer, sequence, qnaRoom);
    const savedQna = await this.qnaRepository.save(qna);
    if (!qnaRoom.qnas) {
      qnaRoom.qnas = []; // Initialize qnas as an empty array if it's not already defined
    }

    qnaRoom.qnas.push(savedQna);

    await this.qnaRoomRepository.save(qnaRoom);
    return savedQna.toResponse();
    // return Promise.resolve(<QnaResponse>{
    //   id: 1,
    //   sequence: 1,
    //   question: 'this is question.',
    //   answer: 'this is answer.',
    // });
  }

  async getQnas(roomId: number): Promise<QnaResponse[]> {
    console.log('roomId: ' + roomId);
    const qnaRoom = await this.qnaRoomRepository.findQnaRoomWithQnas(roomId);
    if (qnaRoom !== null) {
      if (qnaRoom.qnas.length !== 0) {
        const qnaList = qnaRoom.qnas;
        const qnaRoomResponses = qnaList.map((qna) => qna.toResponse());
        return qnaRoomResponses;
      }
    } else {
      return Promise.resolve([]);
    }
  }
}
