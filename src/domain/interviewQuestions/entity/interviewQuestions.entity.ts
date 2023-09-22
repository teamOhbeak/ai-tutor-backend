import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InterviewEntity } from 'src/domain/interview/entity/interview.entity';

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
