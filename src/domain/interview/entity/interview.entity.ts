import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { IsEnum } from 'class-validator';
import { InterviewStatus } from './insterview-status.enum';
import { StackType } from './stack-type.enum';
import { InterviewQuestionEntity } from '@/domain/interview-question/entity/interview-question.entity';
import { UserEntity } from '@/domain/user/entity/user.entity';

@Entity('interview')
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

  @OneToMany(
    () => InterviewQuestionEntity,
    (question) => question.interviewInfo,
  )
  questions: InterviewQuestionEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'user_id'})
  userInfo!: UserEntity;

  constructor() {}

  static CreateInterview(userId: number, dto: CreateInterviewRequest) {
    const interview = new InterviewEntity();
    interview.stack = dto.stack;
    interview.questionCount = dto.questionCount;
    interview.maxWait = dto.maxWait;
    interview.userId = userId;
    interview.status = InterviewStatus.WAIT;
    interview.questions = [];
    return interview;
  }
}
