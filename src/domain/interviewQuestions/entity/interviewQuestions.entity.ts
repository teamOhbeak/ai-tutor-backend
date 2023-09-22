import { FollowUpQuestions } from '@/domain/followUpQuestions/entity/followUpQuestions.entity';
import { InterviewEntity } from '@/domain/interview/entity/interview.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'interview_questions', schema: 'test' })
export class InterviewQuestionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'question_text',
    type: 'text',
  })
  questionText: string;

  @Column({
    name: 'sequence',
    type: 'int',
  })
  sequence: number;

  @Column()
  status: boolean;

  @ManyToOne((type) => InterviewEntity, (interview) => interview)
  interview!: InterviewEntity;

  @Column()
  interviewId: number;

  @UpdateDateColumn({ type: 'int', nullable: true }) 
  intervieAnswerId: number | null;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  // @ManyToOne(() => InterviewEntity, (interviewId) => interviewId)
  // @JoinColumn({name: 'interviewId'})
  // interviewId: InterviewEntity

  // @OneToMany(
  //   () => FollowUpQuestions,
  //   (followUpQuestions) => followUpQuestions.interviewQuestions,
  // )
  // followUpQuestions: FollowUpQuestions[];

  // @ManyToOne(() => QuestionBank, (questionBank) => questionBank.questions)
  // questionBank: QuestionBank;
}
