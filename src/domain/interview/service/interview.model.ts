import { DateTime } from 'luxon';
import { CreateInterviewRequest } from '../../../interface/interview/request/create-interview.request'


// Request Dto -> model
export type CreateInterviewInfo = {
  userId: number;
  stack: Stack;
  questionCount: number;
  maxWait: number;
};

// entity -> model
export type Interview = {
  userId: number;
  stack: Stack;
  questionCount: number;
  maxWait: number;
  createdAt: Date;
}

export enum Stack {
  Java = 'Java',
  JavaScript = 'JavaScript',
  Kotlin = 'Kotlin',
  React = 'React',
  Next = 'Next.js',
  Node = 'Node.js',
  Neest = 'Nest.js',
  Spring = 'Spring',
  CS = 'CS',
}

export function createInterview(request: CreateInterviewRequest): CreateInterviewInfo {
  // CreateInterviewInfo 객체를 생성하여 반환
  const interviewInfo: CreateInterviewInfo = {
    userId: 1,
    stack: request.stack,
    questionCount: request.questionCount,
    maxWait: request.maxWait,
  };

  return interviewInfo;
}

