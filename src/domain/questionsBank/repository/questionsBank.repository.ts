import { Inject, Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { QuestionBank } from '../entity/questionBank.entity';
import { CreateQuestionBankResponse } from '../../../interface/questionBank/response/questionBank.response';

@Injectable()
export class QuestionBankRepository extends Repository<QuestionBank> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(QuestionBank, dataSource.createEntityManager());
  }

  async createQuestions(createQuestionBankReponse: CreateQuestionBankResponse) {
    try {
      const result = await this.insert(createQuestionBankReponse);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async getQuestions(count: number) {
    const result = await this.find({
      where: { createdAt: new Date() },
    });
    return result;
  }
}
