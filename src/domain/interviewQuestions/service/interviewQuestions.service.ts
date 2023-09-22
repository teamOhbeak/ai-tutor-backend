import { Injectable } from '@nestjs/common';
import { InterviewQuestionsService } from './interviewQuestions.interface';
import { followUpQuestionResponse } from '@/interface/interview-qna/response/allQuestion.response';
import { InterviewQuestionsRepositoryImpl } from '../repository/interviewQuestion.repository';
import { PromptService } from '@/domain/prompt/service/prompt.service';
import { InterviewAnswer } from '@/domain/interviewAnswer/entity/interviewAnswer.entity';
import { InterviewAnswersRepository } from '@/domain/interviewAnswer/repository/interviewAnswer.repository.interface';
import { InterviewQuestionDTO } from '@/interface/interview-qna/response/InterviewQuestionDTO';
import { FollowUpQuestionsRepositoryImpl } from '@/domain/followUpQuestions/repository/followUpQuestions.repository';
import { FollowUpQuestions } from '@/domain/followUpQuestions/entity/followUpQuestions.entity';
import { FollowUpQuestionsRepository } from '@/domain/followUpQuestions/repository/followUpQuestions.repository.interface';
import {
  AnswerRequestDto,
  QuestionType,
} from '@/interface/interview-qna/request/answer.resquest';

@Injectable()
export class InterviewQuestionsServiceImpl
  implements InterviewQuestionsService
{
  constructor(
    private readonly interviewQuestionsRepository: InterviewQuestionsRepositoryImpl,
    private readonly interviewAnswersRepository: InterviewAnswersRepository,
    private readonly followUpQuestionsRepository: FollowUpQuestionsRepositoryImpl,
    private readonly promptService: PromptService,
  ) {}

  public async getQuestions(
    interviewId: number,
  ): Promise<InterviewQuestionDTO> {
    try {
      const repo = await this.interviewQuestionsRepository.getQuestions(
        interviewId,
      );
      return repo;
    } catch (error) {
      console.error('Service Error in getQuestions :', error);
      throw new Error('Method not implemented.');
    }
  }

  async submitAnswer(
    questionId: number,
    answerRequestDto: AnswerRequestDto,
  ): Promise<followUpQuestionResponse> {
    try {
      const gptResponse = await this.promptService.submitAnswer(
        answerRequestDto.answer,
      );

      // 꼬리 질문 저장
      const checkSequence =
        await this.followUpQuestionsRepository.hasFollowUpQuestions(questionId);

      const followUpQuestions = new FollowUpQuestions(
        gptResponse,
        checkSequence,
        questionId,
      );

      const follow_up_questions = await this.followUpQuestionsRepository.save(
        this.followUpQuestionsRepository.create(followUpQuestions),
      );

      // 메인 대답 저장
      if (answerRequestDto.questionType === QuestionType.MAIN) {
        const interviewAnswer = new InterviewAnswer(
          answerRequestDto.answer,
          questionId,
        );

        await this.interviewAnswersRepository.save(
          this.interviewAnswersRepository.create(interviewAnswer),
        );
        // 꼬리 대답 저장
      } else {
      }

      //DTO를 사용하여 데이터를 래핑합니다.
      const responseDto: followUpQuestionResponse = {
        questionId: questionId,
        followUpQuestionsSequence: follow_up_questions.sequence,
        followUpQuestion: gptResponse,
      };

      return responseDto;
    } catch (error) {
      console.error('Service Error in submitAnswer :', error);
      throw new Error('Method not implemented.');
    }
  }
}
