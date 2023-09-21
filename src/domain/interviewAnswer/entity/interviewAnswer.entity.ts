import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { InterviewQuestionsEntity } from '../../interviewQuestions/entity/interviewQuestions.entity';

// @Entity('Interview_answer', { schema: 'test' })
// export class InterviewAnswersEntity {
//   @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
//   id: number;

//   @Column('text', { name: 'answer', nullable: false })
//   answer: string;

//   @OneToOne(() => InterviewQuestionsEntity)
//   @JoinColumn({ name: 'interview_question_id' })
//   interviewQuestion: InterviewQuestionsEntity;
// }
