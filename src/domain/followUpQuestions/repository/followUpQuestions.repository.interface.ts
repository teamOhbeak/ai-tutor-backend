


export interface FollowUpQuestionsRepository {
  hasFollowUpQuestions(questionId: number): Promise<boolean>;
}
