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
import { FollowUpAnswer } from '@/domain/followUpAnswer/entity/followUpAnswer.entity';
import { AnswerResponse } from '@/interface/interview-qna/response/answer.response';
import { FollowUpAnswerRepositoryImpl } from '@/domain/followUpAnswer/repository/followUpAnswer.repository';

@Injectable()
export class InterviewQuestionsServiceImpl
  implements InterviewQuestionsService
{
  constructor(
    private readonly interviewQuestionsRepository: InterviewQuestionsRepositoryImpl,
    private readonly interviewAnswersRepository: InterviewAnswersRepository,
    private readonly followUpQuestionsRepository: FollowUpQuestionsRepositoryImpl,
    private readonly interviewRepository: InterviewRepositoryImpl,
    private readonly followUpAnswersRepository: FollowUpAnswerRepositoryImpl,
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
    answerRequestDto: AnswerRequestDto,
  ): Promise<AnswerResponse> {
    try {
      const interview = await this.interviewRepository.findOne({
        where: { id: interviewId },
      });

      // 메인 답변 저장
      if (answerRequestDto.questionType === QuestionType.MAIN) {
        // 가장 높은 순서인거 구하기
        const maxSequence =
          await this.interviewQuestionsRepository.getHighestSequenceByQuestionId(
            answerRequestDto.interviewQuestionId,
          );
        // 메인 질문 상태값 변경(status, updatedAt, sequence)
        const updatedQuestion =
          await this.interviewQuestionsRepository.updateQuestionStatus(
            answerRequestDto.interviewQuestionId,
            maxSequence,
          );

        const interviewAnswer = new InterviewAnswer(
          answerRequestDto.answer,
          answerRequestDto.interviewQuestionId,
        );
        const main = await this.interviewAnswersRepository.save(
          this.interviewAnswersRepository.create(interviewAnswer),
        );

        const answerResponse: AnswerResponse = {
          interviewId: interview.id,
          userId: 1,
          stack: interview.stack,
          questionCount: interview.questionCount,
          maxWait: interview.maxWait,
          createdAt: interview.createdAt,
          questionType: QuestionType.MAIN,
          questions: {
            questionid: updatedQuestion.id,
            question: updatedQuestion.questionText,
            status: updatedQuestion.status, // 답변 완료했으면 true
            sequence: updatedQuestion.sequence,
            createdAt: updatedQuestion.createdAt, // 생성 시간을 설정하세요.
            updatedAt: updatedQuestion.updatedAt, // 업데이트 시간을 설정하세요.
            answer: {
              contents: main.answer,
              createdAt: main.createdAt, // 답변 생성 시간을 설정하세요.
            },
          },
        };
        return answerResponse;
        // 꼬리 답변 저장
      } else {
        // 꼬리 질문 상태값 변경(status, updatedAt, sequence)
        const updatedFollowUpQuestion =
          await this.followUpQuestionsRepository.updateQuestionStatus(
            answerRequestDto.followUpQuestionId,
          );

        const followUpAnswer = new FollowUpAnswer(
          answerRequestDto.answer,
          answerRequestDto.followUpQuestionId,
        );
        const followUp = await this.followUpAnswersRepository.save(
          this.followUpAnswersRepository.create(followUpAnswer),
        );

        const answerResponse: AnswerResponse = {
          interviewId: interview.id,
          userId: 1,
          stack: interview.stack,
          questionCount: interview.questionCount,
          maxWait: interview.maxWait,
          createdAt: interview.createdAt,
          questionType: QuestionType.FOLLOWUP,
          questions: {
            questionid: updatedFollowUpQuestion.id,
            question: updatedFollowUpQuestion.questionText,
            status: updatedFollowUpQuestion.status,
            sequence: updatedFollowUpQuestion.sequence,
            createdAt: updatedFollowUpQuestion.createdAt, // 생성 시간을 설정하세요.
            updatedAt: updatedFollowUpQuestion.updatedAt, // 업데이트 시간을 설정하세요.
            answer: {
              contents: followUp.answer,
              createdAt: followUp.createdAt, // 답변 생성 시간을 설정하세요.
            },
          },
        };
        return answerResponse;
      }
    } catch (error) {
      console.error('Service Error in submitAnswer :', error);
      throw new Error('Method not implemented.');
    }
  }
}
// // gpt
// const gptResponse = await this.promptService.submitAnswer(
//   answerRequestDto.answer,
// );

// // 꼬리 질문 저장
// const checkSequence =
//   await this.followUpQuestionsRepository.hasFollowUpQuestions(questionId);

// const followUpQuestions = new FollowUpQuestions(
//   gptResponse,
//   checkSequence,
//   questionId,
// );

// const follow_up_questions = await this.followUpQuestionsRepository.save(
//   this.followUpQuestionsRepository.create(followUpQuestions),
// );

// // 메인 대답 저장
// if (answerRequestDto.questionType === QuestionType.MAIN) {
//   const interviewAnswer = new InterviewAnswer(
//     answerRequestDto.answer,
//     questionId,
//   );

//   await this.interviewAnswersRepository.save(
//     this.interviewAnswersRepository.create(interviewAnswer),
//   );
//   // 꼬리 대답 저장
// } else {
// }

// //DTO를 사용하여 데이터를 래핑합니다.
// const responseDto: followUpQuestionResponse = {
//   interviewId: interview.id,
//   userId: 1,
//   stack: interview.stack,
//   questionId: questionId,
//   followUpQuestions: [
//     {
//       followUpquestionId: follow_up_questions.id,
//       questionText: follow_up_questions.questionText,
//       createdAt: follow_up_questions.createdAt,
//     },
//     // 여러 follow-up questions가 있다면 각각의 객체를 배열에 추가하세요.
//   ],
// };
