import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { CreateInterviewRequest } from '@/interface/interview/request/create-interview.request';

export enum StackType {
  'Java',
  'JavaScript',
  'Kotlin',
  'React',
  'Next.js',
  'Node.js',
  'Nest.js',
  'Spring',
  'CS',
}

@Entity('interview')
export class InterviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  // @Column({
  //   name: 'stack',
  //   enum: StackType
  // })
  // stack: StackType;

  // @Column({
  //   type: 'int'
  // })
  // questionCount: number;

  // @Column({
  //   type: 'int'
  // })
  // maxWait: number;

  // @CreateDateColumn({
  //   name: 'created_at'
  // })
  // createdAt: Date;

  // @Column({
  //   name: 'finished_at'
  // })
  // finishedAt?: Date;

  // @OneToMany(() => InterviewQuestionsEntity, (question) => question.interview)
  // questions: InterviewQuestionsEntity[];


  constructor() {

  }

  static CreateInterview(userId: number, dto: CreateInterviewRequest) {
    const interview = new InterviewEntity();
    // interview.stack = dto.stack;
    // interview.questionCount = dto.questionCount;
    // interview.questions = [];
    interview.userId = userId;
    return interview;
  }
}
