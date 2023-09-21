import { DateTime } from 'luxon';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { InterviewQuestionsEntity } from '../../interviewQuestions/entity/interviewQuestions.entity';


export enum StackType {
  'Java',
  'JavaScript',
  'Kotlin',
  'React',
  'Next.js',
  'Node.js',
  'Nest.js',
  'Spring',
  'CS',
}

@Entity('interview', { schema: 'test' })
export class InterviewEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('bigint', { name: 'user_id', nullable: false })
  userId: number;

  @Column('enum', {
    name: 'stack',
    enum: StackType,
    nullable: true,
  })
  stack: StackType;

  @Column('int', { name: 'questionCount', nullable: false })
  questionCount: number;

  @Column('int', { name: 'maxWait', nullable: false })
  maxWait: number;

  @Column('datetime', {
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => InterviewQuestionsEntity, (question) => question.interview)
  questions: InterviewQuestionsEntity[];
}
