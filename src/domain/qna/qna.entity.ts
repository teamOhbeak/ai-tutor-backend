import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Qna {
  @PrimaryGeneratedColumn()
  id: number;

  question: string;

  createdAt: Date;

  updatedAt: Date;

  answer: boolean;

  sequence: number;
}
