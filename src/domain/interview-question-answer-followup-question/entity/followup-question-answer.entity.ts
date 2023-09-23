import { FollowUpQuestionEntity } from '@/domain/interview-question-answer-followup-question/entity/followup-question.entity';
import { InterviewQuestionEntity } from '@/domain/interview-question/entity/interview-question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('followup_question_answer')
export class FollowUpQuestionAnswerEntity {
  @PrimaryGeneratedColumn({
    name: 'answer_id',
  })
  answerId: number;

  @Column({
    name: 'answer_text',
  })
  answerText: string;

  @Column({
    name: 'question_id',
  })
  questionId: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @OneToOne(() => FollowUpQuestionEntity)
  @JoinColumn({ name: 'question_id' })
  question: FollowUpQuestionEntity;
}
