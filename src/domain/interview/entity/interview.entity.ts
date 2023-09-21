import { DateTime } from 'luxon';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { InterviewQuestionsEntity } from './interviewQuestions.entity';

@Entity('interview', { schema: 'test' })
export class InterviewEntity {
  
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  // @Column('varchar', { name: 'type', length: 50, nullable: false  })
  // type: string;

  @Column('bigint', { name: 'user_id', nullable: false })
  userId: number;

  @Column('enum', {
    name: 'stack',
    enum: [
      'Java',
      'JavaScript',
      'Kotlin',
      'React',
      'Next.js',
      'Node.js',
      'Nest.js',
      'Spring',
      'CS',
    ],
    nullable: true,
  })
  stack:
    | 'Java'
    | 'JavaScript'
    | 'Kotlin'
    | 'React'
    | 'Next.js'
    | 'Node.js'
    | 'Nest.js'
    | 'Spring'
    | 'CS';

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
