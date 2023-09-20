import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QnaRoom {
  @PrimaryGeneratedColumn()
  id: number;

  title: string;

  createdAt: Date;

  updatedAt: Date;

  deleted: boolean;
}
