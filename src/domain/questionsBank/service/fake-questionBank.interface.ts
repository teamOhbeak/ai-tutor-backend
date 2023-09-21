import { QuestionBankResponse } from '../../../interface/questionBank/response/questionBank.response';

export interface IFakeQuestionBankService {
  getFakeQuestions(count: number): Promise<QuestionBankResponse[]>;
}
