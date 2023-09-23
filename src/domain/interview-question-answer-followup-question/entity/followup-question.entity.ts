import { InterviewQuestionAnswerEntity } from "@/domain/interview-question-answer/entity/interview-question-answer.entity";
import { InterviewQuestionEntity } from "@/domain/interview-question/entity/interview-question.entity";
import { QuestionStatus } from "@/domain/questionsBank/entity/questionBank.entity";
import { IsEnum } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FollowUpQuestionAnswerEntity } from "./followup-question-answer.entity";

@Entity('followup_question')
export class FollowUpQuestionEntity {
  @PrimaryGeneratedColumn({
    name: 'question_id',
  })
  questionId: number;

  @Column({
    name: 'main_answer_id'
  })
  mainAnswerId: number;

  @Column({
    name: 'main_question_id'
  })
  mainQuestionId: number;

  @Column({
    name: 'question_text',
    type: 'text',
  })
  questionText: string;

  @IsEnum(QuestionStatus)
  @Column()
  status: QuestionStatus;

  @Column({ name: 'interview_id' })
  interviewId: number;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  startedAt?: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  finishedAt?: Date;

  @ManyToOne(() => InterviewQuestionAnswerEntity)
  @JoinColumn({name: 'main_answer_id'})
  mainQuestionAnswer: InterviewQuestionAnswerEntity;

  @OneToOne(() => FollowUpQuestionAnswerEntity, (question) => question.question)
  @JoinColumn({name: 'answer_id'})
  answer?: FollowUpQuestionAnswerEntity;
}