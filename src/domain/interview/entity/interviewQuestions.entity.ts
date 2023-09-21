import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InterviewEntity } from './interview.entity';
import { QuestionBankEntity } from './questionBank.entity';

@Entity('Interview_questions', { schema: 'test' })
export class InterviewQuestionsEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('text', { name: 'question_text', nullable: false })
  questionText: string;

  @Column('int', { name: 'sequence', nullable: false })
  sequence: number;

  @Column('boolean', { name: 'status', nullable: false })
  status: boolean;

  @ManyToOne(() => InterviewEntity, (interview) => interview.questions)
  interview: InterviewEntity;

  @ManyToOne(() => QuestionBankEntity, (questionBank) => questionBank.questions)
  questionBank: QuestionBankEntity;
}
