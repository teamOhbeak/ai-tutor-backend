import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InterviewEntity } from 'src/domain/interview/entity/interview.entity';

@Entity('Interview_question')
export class InterviewQuestionEntity {
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

  // @ManyToOne(() => InterviewEntity, (interview) => interview.questions)
  // interview: InterviewEntity;

  // @ManyToOne(() => QuestionBank, (questionBank) => questionBank.questions)
  // questionBank: QuestionBank;
}
