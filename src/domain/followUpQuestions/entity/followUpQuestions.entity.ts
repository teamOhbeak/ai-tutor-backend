import { InterviewQuestionsEntity } from '@/domain/interviewQuestions/entity/interviewQuestions.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('follow_up_questions')
export class FollowUpQuestions {
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

  @ManyToOne(
    () => InterviewQuestionsEntity,
    (interviewQuestions) => interviewQuestions.id,
  )
  interviewQuestions: InterviewQuestionsEntity;

  constructor(
    questionText: string,
    checkSequence: boolean,
    questionId: number,
  ) {
    this.questionText = questionText;
    this.sequence = checkSequence ? 2 : 1; // checkSequence가 true일 경우2, 아닐 경우 1
    this.interviewQuestions.id = questionId;
  }
}
