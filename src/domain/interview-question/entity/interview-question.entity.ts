import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InterviewEntity } from 'src/domain/interview/entity/interview.entity';
import { UserEntity } from '@/domain/user/entity/user.entity';

@Entity('interview_question')
export class InterviewQuestionEntity {
  @PrimaryGeneratedColumn({
    name: 'question_id'
  })
  questionId: number;

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

  @Column({name: 'user_id'})
  userId: number;

  @ManyToOne(() => InterviewEntity)
  @JoinColumn({name: 'user_id'})
  interviewInfo: InterviewEntity;
}
