import { CreateQuestionRequest } from '@/interface/qna-room-qna/request/create-question-request';
import { QnaResponse } from '@/interface/qna-room-qna/response/qna-response';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QnaRepository } from '../repository/qna-repository';
import { QnaRoomRepository } from '@/domain/qna-room/repository/qna-room-repository';
import { Qna } from '../entity/qna.entity';
import { PromptService } from '../../prompt/service/prompt.service';

@Injectable()
export class QnaService {
  constructor(
    private qnaRepository: QnaRepository,
    private qnaRoomRepository: QnaRoomRepository,
    private readonly promptService: PromptService,
  ) {}

  async createQna(qnaRequest: CreateQuestionRequest): Promise<QnaResponse> {
    console.log(qnaRequest);
    const qnaRoom = await this.qnaRoomRepository.findQnaRoomWithQnas(
      qnaRequest.roomId,
    );

    if (qnaRoom == null || qnaRoom === undefined) {
      throw new Error('qnaRoom is null');
    }

    const qnaList = qnaRoom.qnas;
    let sequence: number;

    if (!qnaList || qnaList.length === 0) {
      sequence = 0;
    } else {
      const maxSequence = Math.max(...qnaList.map((qna) => qna.sequence));
      sequence = maxSequence + 1;
    }

    let mostRecentQnas = [];
    if (qnaList.length === 0) {
      mostRecentQnas = [];
    } else if (qnaList.length === 1) {
      mostRecentQnas = qnaList;
    } else {
      mostRecentQnas = qnaList.sort((a, b) => a.sequence - b.sequence);
      mostRecentQnas = qnaList.slice(-2);
      mostRecentQnas.sort((a, b) => a.sequence - b.sequence); // Adjust the slice to get the desired number
    }

    /* TODO: answer
    아래 answer에 프롬프트 응답값 받아야함. 
    */
    const { answer } = await this.promptService.getQnaPrompt(
      qnaRequest.question,
      mostRecentQnas,
    );
    const realAnswer =
      answer == undefined || answer == null ? '답변이 없습니다.' : answer;
    const qna = new Qna(qnaRequest.question, realAnswer, sequence, qnaRoom);
    const savedQna = await this.qnaRepository.save(qna);
    if (!qnaRoom.qnas) {
      qnaRoom.qnas = []; // Initialize qnas as an empty array if it's not already defined
    }
    qnaRoom.qnas.push(savedQna);
    await this.qnaRoomRepository.save(qnaRoom);
    return savedQna.toResponse();
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
