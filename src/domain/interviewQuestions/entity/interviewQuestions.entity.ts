import { InterviewEntity } from '@/domain/interview/entity/interview.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('interview_questions')
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

  @ManyToOne(() => InterviewEntity, (interview) => interview.id)
  interview: InterviewEntity;

  // @ManyToOne(() => QuestionBank, (questionBank) => questionBank.questions)
  // questionBank: QuestionBank;
}
