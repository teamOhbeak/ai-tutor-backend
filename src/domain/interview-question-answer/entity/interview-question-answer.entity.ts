import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('interview_question')
export class InterviewQuestionAnswerEntity 
{
  @PrimaryGeneratedColumn({
    name: 'answer_id'
  })
  answerId: number;

  @Column({
    name: 'answer_text'
  })
  answerText: string;

  @Column({
    name: 'question_id'
  })
  questionId: number;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;
}