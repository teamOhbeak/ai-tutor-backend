import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';
import { InterviewQuestionsEntity } from '@/domain/interviewQuestions/entity/interviewQuestions.entity';
import { IsEnum } from 'class-validator';

export enum StackType {
  JAVA = 'Java',
  JAVA_SCRIPT = 'JavaScript',

  // 'Java',
  // 'JavaScript',
  // 'Kotlin',
  // 'React',
  // 'Next.js',
  // 'Node.js',
  // 'Nest.js',
  // 'Spring',
  // 'CS',
}

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
    type: 'int'
  })
  questionCount: number;

  @Column({
    type: 'int'
  })
  maxWait: number;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @Column({
    name: 'finished_at',
    nullable: true
  })
  finishedAt?: Date;

  @OneToMany(() => InterviewQuestionsEntity, (question) => question.interview)
  questions: InterviewQuestionsEntity[];

  constructor() {}

  static CreateInterview(userId: number, dto: CreateInterviewRequest) {
    const interview = new InterviewEntity();
    interview.stack = dto.stack;
    interview.questionCount = dto.questionCount;
    interview.maxWait = dto.maxWait;
    interview.questions = [];
    interview.userId = userId;
    return interview;
  }
}
