import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InterviewQuestionsEntity } from "./interviewQuestions.entity";


@Entity('question_bank', { schema: 'test' })
export class QuestionBankEntity {

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('text', { name: 'question', nullable: false })
  question: string;

  @Column('enum', { name: 'status',
  enum: [
    'PENDING',
    'AVAILABLE',
    'DELETED',
   ],
   nullable: true,
 })
 status:
   | 'PENDING'
   | 'AVAILABLE'
   | 'DELETED';

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

    @Column('datetime', {
      name: 'created_at',
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column('datetime', {
      name: 'updated_at',
      nullable: false,
    })
    updatedAt: Date;

    @OneToMany(() => InterviewQuestionsEntity, (question) => question.interview)
    questions: InterviewQuestionsEntity[];
}