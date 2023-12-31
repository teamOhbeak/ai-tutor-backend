import { QnaRoomResponse } from '@/interface/qna-room/response/qna-room.response';
import { CreateQnaRoomRequest } from '@/interface/qna-room/request/create-qna-room.request';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Qna } from '@/domain/qna/entity/qna.entity';
import { QnaRoomDetailResponse } from '@/interface/qna-room/response/qna-room-detail.response';

@Entity('qna_room')
export class QnaRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  deleted: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @OneToMany(() => Qna, (qna) => qna.qnaRoom)
  qnas: Qna[];

  constructor(createQnaRoomRequest?: CreateQnaRoomRequest) {
    if (createQnaRoomRequest) {
      this.title = createQnaRoomRequest.title;
      this.deleted = false;
      this.qnas = [];
    }
  }

  getCreatedAt(): string {
    return this.createdAt.toISOString().slice(0, 16).replace('T', ' ');
  }

  toResponse(): QnaRoomResponse {
    return new QnaRoomResponse(this.id, this.title, this.getCreatedAt(), null);
  }

  toDetailResponse(): QnaRoomDetailResponse {
    const qnaRoomResponses = this.qnas.map((qna) => qna.toResponse());
    return new QnaRoomDetailResponse(
      this.id,
      this.title,
      this.getCreatedAt(),
      'username',
      qnaRoomResponses,
    );
  }
}
