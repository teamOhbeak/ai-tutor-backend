import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'interview_answer', schema: 'test' })
export class InterviewAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  questionId: number;

  constructor(answer: string, questionId: number) {
    this.answer = answer;
    this.questionId = questionId;
  }
}
