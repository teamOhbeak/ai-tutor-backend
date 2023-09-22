import { Injectable } from '@nestjs/common';
import { InterviewQuestionsService } from './interviewQuestions.interface';
import { InterviewQuestionsRepositoryImpl } from '../repository/interviewQuestion.repository';
import { PromptService } from '@/domain/prompt/service/prompt.service';
import { InterviewAnswer } from '@/domain/interviewAnswer/entity/interviewAnswer.entity';
import { InterviewAnswersRepository } from '@/domain/interviewAnswer/repository/interviewAnswer.repository.interface';
import { InterviewQuestionDTO } from '@/interface/interview-qna/response/InterviewQuestionDTO';
import { FollowUpQuestionsRepositoryImpl } from '@/domain/followUpQuestions/repository/followUpQuestions.repository';
import { FollowUpQuestions } from '@/domain/followUpQuestions/entity/followUpQuestions.entity';
import {
  AnswerRequestDto,
  QuestionType,
} from '@/interface/interview-qna/request/answer.resquest';
import { followUpQuestionResponse } from '@/interface/interview-qna/response/followUpQuestionResponse';
import { InterviewRepositoryImpl } from '@/domain/interview/repository/interview.repository';

@Injectable()
export class InterviewQuestionsServiceImpl
  implements InterviewQuestionsService
{
  constructor(
    private readonly interviewQuestionsRepository: InterviewQuestionsRepositoryImpl,
    private readonly interviewAnswersRepository: InterviewAnswersRepository,
    private readonly followUpQuestionsRepository: FollowUpQuestionsRepositoryImpl,
    private readonly interviewRepository: InterviewRepositoryImpl,
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
    interviewId: number,
    questionId: number,
    answerRequestDto: AnswerRequestDto,
  ): Promise<followUpQuestionResponse> {
    try {
      // gpt
      const gptResponse = await this.promptService.submitAnswer(
        answerRequestDto.answer,
      );
      const interview = await this.interviewRepository.findOne({
        where: { id: interviewId },
      });
      
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
        interviewId: interview.id,
        userId: 1,
        stack: interview.stack,
        questionId: questionId,
        followUpQuestions: [
          {
            followUpquestionId: follow_up_questions.id,
            questionText: follow_up_questions.questionText,
            createdAt: follow_up_questions.createdAt,
          }
          // 여러 follow-up questions가 있다면 각각의 객체를 배열에 추가하세요.
        ]
        // questionId: questionId,
        // followUpQuestionsSequence: follow_up_questions.sequence,
        // followUpQuestion: gptResponse,
        // createdAt: follow_up_questions.createdAt,
        // userId: 1
      };

      return responseDto;
    } catch (error) {
      console.error('Service Error in submitAnswer :', error);
      throw new Error('Method not implemented.');
    }
  }
}
