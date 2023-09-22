import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { InterviewQuestionsEntity } from '@/domain/interviewQuestions/entity/interviewQuestions.entity';
import { IsEnum, IsInt } from 'class-validator';
import { InterviewStatus } from './insterview-status.enum';
import { StackType } from './stack-type.enum';


@Entity({ name: 'interview', schema: 'test' })
export class InterviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  @IsEnum(StackType)
  stack: StackType;

  @Column({
    type: 'int',
  })
  questionCount: number;

  @Column({
    type: 'int',
  })
  maxWait: number;

  @Column()
  @IsEnum(InterviewStatus)
  status: InterviewStatus;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    name: 'finished_at',
    nullable: true,
  })
  finishedAt?: Date;

  // @OneToMany(() => InterviewQuestionsEntity, (question) => question.interview)
  // questions: InterviewQuestionsEntity[];

  constructor() {}

  static CreateInterview(userId: number, dto: CreateInterviewRequest) {
    const interview = new InterviewEntity();
    interview.stack = dto.stack;
    interview.questionCount = dto.questionCount;
    interview.maxWait = dto.maxWait;
    // interview.questions = [];
    interview.userId = userId;
    interview.status = InterviewStatus.WAIT;
    return interview;
  }
}
