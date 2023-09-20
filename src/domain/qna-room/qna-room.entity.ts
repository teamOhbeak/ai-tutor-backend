import { QnaRoomResponse } from '@/interface/qna-room/response/qna-room.response';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Qna } from '../qna/qna.entity';
import { CreateQnaRoomRequest } from '@/interface/qna-room/request/create-qna-room.request';

@Entity()
export class QnaRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  title: string;

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

  @Column({
    type: 'boolean',
  })
  deleted: boolean;

  @OneToMany(() => Qna, (qna) => qna.qnaRoom)
  qnas: Qna[];
  static qnas: any;

  constructor(createQnaRoomRequest: CreateQnaRoomRequest) {
    this.title = createQnaRoomRequest.title;
    this.deleted = false;
  }

  toResponse(): QnaRoomResponse {
    return new QnaRoomResponse(this.id, this.title, this.createdAt, null);
  }
}
