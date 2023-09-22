import { Inject, Injectable } from '@nestjs/common';
import { QnaRoom } from '../entity/qna-room.entity';
import { DataSource, EntityRepository, Repository } from 'typeorm';

@EntityRepository(QnaRoom)
export class QnaRoomRepository extends Repository<QnaRoom> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(QnaRoom, dataSource.createEntityManager());
  }

  async createQnaRoom(qnaRoom: QnaRoom): Promise<QnaRoom> {
    const result = await this.save(qnaRoom);
    return result;
  }

  async findQnaRoomNotDeleted(): Promise<QnaRoom[]> {
    const result = await this.find({
      where: {
        deleted: false,
      },
    });
    return result;
  }

  async findQnaRoomById(id: number): Promise<QnaRoom> {
    const result = await this.findOne({
      where: { id: id },
    });
    return result;
  }

  async deleteQnaRoom(id: number): Promise<void> {
    await this.update({ id }, { deleted: true });
  }

  async findQnaRoomWithQnas(roomId: number): Promise<QnaRoom | undefined> {
    return this.findOne({
      where: { id: roomId },
      relations: ['qnas'],
    });
  }
}
