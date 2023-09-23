import { Injectable } from '@nestjs/common';
import { InterviewQuestionRepository } from '../repository/interview-question.repository';
import { InterviewQuestionEntity } from '../entity/interview-question.entity';
import {
  InterviewQuestion,
  PromptService,
} from '@/domain/prompt/service/prompt.service';
import { InterviewQuestionAndAnswerEntity } from '../entity/interview-question-and-answer.entity';
import { InterviewQuestionAndAnswerRepository } from '../repository/interview-question-and-answer.repository';
import { InterviewQnaUtil } from '../utils/interview-qna.util';
import { QuestionBankRepository } from '../../questionsBank/repository/questionsBank.repository';
import { StackType } from '../../interview/entity/stack-type.enum';
import { QuestionStatus as questionStatusForQuestion } from '../entity/question-status.enum';
import {
  CreateQuestionBankResponse,
  QuestionBankResponse,
} from '../../../interface/questionBank/response/questionBank.response';
import { InterviewStatus } from '../../interview/entity/insterview-status.enum';
import { MainQnaResponse } from '../../../interface/interview-qna/response/main-qna.response';
import { QuestionStatus } from '../../questionsBank/entity/questionBank.entity';
import { FollowUpQuestionRequest } from '../../../interface/prompt/request/followup-question.request';
import { QuestionStateResponse } from '../../../interface/interview-qna/response/question-state.response';

@Injectable()
export class InterviewQuestionService {
  constructor(
    private readonly questionBankRepository: QuestionBankRepository,
    private readonly promptService: PromptService,
    private readonly interviewQnaRepository: InterviewQuestionAndAnswerRepository,
  ) {}

  async saveInterviewQuestions(
    questions: InterviewQuestionAndAnswerEntity[],
  ): Promise<InterviewQuestionAndAnswerEntity[]> {
    return await this.interviewQnaRepository.saveQuestions(questions);
  }

  //1. 인터뷰의 질문 목록을 가져온다. (Detail - FollowUpQuestions까지 구하기)
  // 인터뷰 질문목록 가져오는 인터뷰 상세페이지랑, 인터뷰 진행하는 화면에 사용가능
  async getInterviewQuestions(interviewId: number): Promise<MainQnaResponse[]> {
    const questions = await this.interviewQnaRepository.getMainQuestions(
      interviewId,
    );
    const followUpQuestions =
      await this.interviewQnaRepository.getFollowUpQuestions(interviewId);
    return questions.map((question) => {
      const questionsOfMain = followUpQuestions.filter((fqs) => {
        return fqs.mainQuestionId === question.id;
      });
      return InterviewQnaUtil.toMainQuestionResponse(question, questionsOfMain);
    });
  }

  // /api/interviews/{interviewId}/questions/{questionId}/answer
  //2. 답변 저장하기 ( 유형 : 답변한 경우 - (메인질문, 꼬리질문), 패스한 경우 )
  //  isPass = Y  패스를 한경우
  // isPass = N 패스를 안한경우
  // 답변이 저장되면 stptus -> DONE
  // + 다음 질문 가져오기
  // + 다음 질문이 메인 질문이 아니면 GPT 질문 요청 -> 다음 질문의 질문으로 저장 ( 4번 로직 요청 )
  async saveAnswer(
    interviewId: number,
    questionId: number,
    answerText: string,
  ): Promise<QuestionStateResponse> {
    const question = await this.interviewQnaRepository.findQuestionById(
      questionId,
    );
    if (answerText == '') question.submitAnswer(answerText);
    else question.submitPass();
    this.interviewQnaRepository.save(question);

    const nextQuestions = await this.interviewQnaRepository.getWaitQuestions(
      interviewId,
    );
    if (nextQuestions.length > 0) {
      const nextQuestion = nextQuestions[0];
      if (
        nextQuestion.questionText == null ||
        nextQuestion.questionText == ''
      ) {
        const followUpQuestion = await this.createFollowUpQuestion(
          question.questionText,
          question.answerText,
        );
        nextQuestion.saveFollowUpQuestion(followUpQuestion);
      }
    }
    return InterviewQnaUtil.toQuestionStateResponse(question);
  }

  async createFollowUpQuestion(questionText: string, answer: string) {
    const req = new FollowUpQuestionRequest();
    req.question = questionText;
    req.answer = answer;
    return await this.promptService.getFollowup(req);
  }

  // 면접방 생성
  // 데이터 로딩 5개
  // map으로 status가 이 아닌지 체크
  // 1. done이 아닌 질문이 있다면 -> 진행할 질문 찾기

  // DATA : 면접 질문 목록
  //
  // 1. question: '1번 질문', answer:'1번 답변', status : '완료'
  // 1-1. question: '', answer:'', status : '대기' mainQuestionId: 1
  // 1-2. question: '', answer:'', status : '대기'
  async getNextQuestionInfo(interviewId: number): Promise<any> {
    const questions = await this.interviewQnaRepository.getWaitQuestions(
      interviewId,
    );

    if (questions.length == 0) {
      return InterviewQnaUtil.toNextQuestionResponse(
        InterviewStatus.DONE,
        null,
      );
    }
    return InterviewQnaUtil.toNextQuestionResponse(
      InterviewStatus.IN_PROGRESS,
      questions[0],
    );
  }
}
