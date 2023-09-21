import {
  CreateInterviewInfo,
  Interview,
} from '@/domain/interview/service/interview.model';

export interface InterviewRepository {
  saveInterview(interviewInfo: CreateInterviewInfo): Promise<number>;
}
