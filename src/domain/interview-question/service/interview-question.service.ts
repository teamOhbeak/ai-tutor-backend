import { Injectable } from '@nestjs/common';
import { InterviewQuestionRepository } from '../repository/interview-question.repository';
import { InterviewQuestionEntity } from '../entity/interview-question.entity';
import { InterviewQuestion } from '@/domain/prompt/service/prompt.service';
import { InterviewQuestionAndAnswerEntity } from '../entity/interview-question-and-answer.entity';
import { InterviewQuestionAndAnswerRepository } from '../repository/interview-question-and-answer.repository';
import { InterviewQnaUtil } from '../utils/interview-qna.util';
import { QuestionBankRepository } from '../../questionsBank/repository/questionsBank.repository';
import { StackType } from '../../interview/entity/stack-type.enum';
import { QuestionStatus } from '../entity/question-status.enum';
import { QuestionBankResponse } from '../../../interface/questionBank/response/questionBank.response';
import { InterviewStatus } from '../../interview/entity/insterview-status.enum';
import { MainQnaResponse } from '../../../interface/interview-qna/response/main-qna.response';

@Injectable()
export class InterviewQuestionService {
  constructor(
    private readonly questionBankRepository: QuestionBankRepository,
    private readonly repository: InterviewQuestionAndAnswerRepository,
  ) {}

  async saveInterviewQuestions(
    questions: InterviewQuestionAndAnswerEntity[],
  ): Promise<InterviewQuestionAndAnswerEntity[]> {
    return await this.repository.save(questions);
  }

  //1. 인터뷰의 질문 목록을 가져온다. (Detail - FollowUpQuestions까지 구하기)
  // 인터뷰 질문목록 가져오는 인터뷰 상세페이지랑, 인터뷰 진행하는 화면에 사용가능
  async getInterviewQuestions(interviewId: number): Promise<MainQnaResponse[]> {
    const questions = await this.repository.getMainQuestions(interviewId);
    const followUpQuestions = await this.repository.getFollowUpQuestions(
      interviewId,
    );
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
  // 답변이 저장되면 status -> DONE
  // + 다음 질문 가져오기
  // + 다음 질문이 메인 질문이 아니면 GPT 질문 요청 -> 다음 질문의 질문으로 저장 ( 4번 로직 요청 )
  async saveAnswer() {}

  //4. 꼬리질문 생성요청하기 && 꼬리질문 저장하기 (파라미터: '이전 질문의 답변', questionId)
  //4-1. 답변을 가지고 꼬리 질문을 생성을 요청한다.
  //4-2. 응답 받은 질문을 questionId에 업데이트 한다.
  //

  // 면접방 생성
  // 데이터 로딩 5개
  // map으로 status가 이 아닌지 체크
  // 1. done이 아닌 질문이 있다면 -> 진행할 질문 찾기

  // DATA : 면접 질문 목록
  //
  // 1. question: '1번 질문', answer:'1번 답변', status : '완료'
  // 1-1. question: '1번 답변 꼬리질문', answer:'', status : '대기'
  // 1-2. question: '', answer:'', status : '대기'

  // 요청 추가 : api/interviews/{interviewid}/question
  //3. 진행할 질문 찾기 ( interviewId에 해당하는 질문들 중 다음 진행해야할 질문이 무엇인지 찾는다. (1.메인질문 || 2.꼬리질문 || 3. null - 면접 종료 ))
  //3-1. 인터뷰의 전체 질문 목록을 가져온다. (status -> 대기)
  //3-2. 질문이 있는가?
  //3-2-1. 질문이 없는 경우 : -> 완료 처리하고
  //3-2-2. 질문이 있는 경우 : -> 클라이언트한테 질문정보 리턴
  //3-3. 질문정보를 찾았는가?
  //3-3-1. 찾았다면 -> 진행
  //3-3-2. 못 찾았다면 -> 면접 종료를 의미 ( 모든 질문을 진행완료했기 때문에 )
  async getNextQuestionInfo(interviewId: number): Promise<any> {
    const questions =
      await this.repository.getAllQuestionsByInterviewIdAndStatus(
        interviewId,
        QuestionStatus.WAIT,
      );

    if (questions.length == 0) {
      return {
        progressStatus: InterviewStatus.DONE,
        questionInfo: {},
      };
    }
  }

  // 응답 포멧
  /*{
    qustion: {진행할 정보 구조},
    process: 진행중, 완료
  }
  */

  //
  //5. 질문 생성하기 (question_bank 서비스) -> 아래 형태
  // 1. question: '1번 질문', answer:'', status : '대기'
  // 1-2. question: '', answer:'', status : '대기'
  async createQuestion(count: number, stack: StackType) {
    // 카운트 만큼 가져옴
    const result = await this.questionBankRepository.getQuestions(count);

    // status를 변경
  }
}
