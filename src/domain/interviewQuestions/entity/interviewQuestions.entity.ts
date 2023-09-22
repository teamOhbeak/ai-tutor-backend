import { FollowUpQuestions } from '@/domain/followUpQuestions/entity/followUpQuestions.entity';
import { InterviewEntity } from '@/domain/interview/entity/interview.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @Column()
  intervieAnswerId: number;

  // @OneToMany(
  //   () => FollowUpQuestions,
  //   (followUpQuestions) => followUpQuestions.interviewQuestions,
  // )
  // followUpQuestions: FollowUpQuestions[];

  // @ManyToOne(() => QuestionBank, (questionBank) => questionBank.questions)
  // questionBank: QuestionBank;
}
