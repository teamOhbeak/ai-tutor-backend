import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Qna } from '../entity/qna.entity';
import { QnaRoom } from '@/domain/qna-room/entity/qna-room.entity';

@EntityRepository(Qna)
export class QnaRepository extends Repository<Qna> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(Qna, dataSource.createEntityManager());
  }

  async createQna(qna: Qna): Promise<Qna> {
    const result = await this.save(qna);
    return result;
  }

  async findQnaByQnaRoomId(qnaRoom: number): Promise<Qna[]> {
    const result = await this.find({
      where: {
        qnaRoom: QnaRoom,
      },
    });
    return result;
  }
}
