import { IsOptional } from "class-validator";

export class FollowUpQuestionRequest {
  @IsOptional()
  question: string;
  @IsOptional()
  answer: string;
}
