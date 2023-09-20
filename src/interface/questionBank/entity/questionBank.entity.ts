import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StacktType } from '../../interview/response/my-interview-detail.response';

@Entity()
export class QuestionBankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  stackType: StacktType;

  @Column({
    type: 'varchar',
  })
  question: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
