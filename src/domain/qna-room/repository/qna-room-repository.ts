import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QnaRoom } from '../qna-room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QnaRoomRepository {
  constructor(
    @InjectRepository(QnaRoom) private qnaRoomModel: Repository<QnaRoom>,
  ) { }

  async createQnaRoom(qnaRoom: QnaRoom): Promise<QnaRoom> {
    const result = await this.qnaRoomModel.save(qnaRoom);
    return result;
  }

  async findQnaRoomNotDeleted(): Promise<QnaRoom[]> {
    const result = await this.qnaRoomModel.find({
      where: {
        deleted: false,
      },
    });
    return result;
  }

  async findQnaRoomById(id: number): Promise<QnaRoom> {
    const result = await this.qnaRoomModel.findOne({
      where: { id: id },
    });
    return result;
  }

  async deleteQnaRoom(id: number): Promise<void> {
    await this.qnaRoomModel.update({ id }, { deleted: true });
  }
}
