import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { PromptService } from '../prompt/service/prompt.service';
import { QuestionBankRepository } from '../questionsBank/repository/questionsBank.repository';
import { StackType } from '../../interface/interview/response/my-interview-detail.response';
import { QuestionStatus } from '../questionsBank/entity/questionBank.entity';

@Injectable()
export class BatchService {
  constructor(
    private readonly promptService: PromptService,
    private readonly questionBankRepository: QuestionBankRepository,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async questionCollectorFromGpt() {
    const promptResult = await this.promptService.getInterviewQuestionsPrompt();

    for (const key in StackType) {
      promptResult[StackType[key]]?.map(async (question: string) => {
        await this.questionBankRepository.createQuestions({
          question,
          stack: StackType[StackType[key]],
          status: QuestionStatus.APPROVED,
        });
      });
    }
    return 'success';
  }

  async questionCollectorFromLocalData() {
    const promptResult = await this.promptService.getInterviewQuestionsPrompt();

    for (const key in StackType) {
      data[StackType[key]]?.map(async (question: string) => {
        await this.questionBankRepository.createQuestions({
          question,
          stack: StackType[StackType[key]],
          status: QuestionStatus.APPROVED,
        });
      });
    }
    return 'success';
  }
}

const data = {
  JAVA: [
    '자바의 특징은 무엇인가요?',
    '자바에서 객체 지향 프로그래밍이란 무엇인가요?',
    '자바에서 인터페이스와 추상 클래스의 차이점은 무엇인가요?',
    '자바에서 예외 처리 방법에는 어떤 것들이 있나요?',
    '자바에서 다형성이란 무엇인가요?',
    '자바에서 제네릭이란 무엇인가요?',
    '자바에서 컬렉션 프레임워크란 무엇인가요?',
    '자바에서 스레드란 무엇인가요?',
    '자바에서 싱글톤 패턴이란 무엇인가요?',
    '자바에서 JDBC란 무엇인가요?',
  ],
  JAVASCRIPT: [
    '자바스크립트의 특징은 무엇인가요?',
    '자바스크립트에서 호이스팅이란 무엇인가요?',
    '자바스크립트에서 클로저란 무엇인가요?',
    '자바스크립트에서 프로토타입이란 무엇인가요?',
    '자바스크립트에서 이벤트 버블링과 캡처링이란 무엇인가요?',
    '자바스크립트에서 비동기 처리를 위한 방법에는 어떤 것들이 있나요?',
    '자바스크립트에서 ES6의 중요한 기능은 무엇인가요?',
    '자바스크립트에서 모듈화를 위한 방법에는 어떤 것들이 있나요?',
    '자바스크립트에서 클라이언트와 서버 간 통신을 위한 방법에는 어떤 것들이 있나요?',
    '자바스크립트에서 콜백 함수란 무엇인가요?',
  ],
  KOTLIN: [
    '코틀린의 특징은 무엇인가요?',
    '코틀린에서 널 안전성이란 무엇인가요?',
    '코틀린에서 확장 함수란 무엇인가요?',
    '코틀린에서 데이터 클래스란 무엇인가요?',
    '코틀린에서 컬렉션 처리를 위한 기능에는 어떤 것들이 있나요?',
    '코틀린에서 코루틴이란 무엇인가요?',
    '코틀린에서 싱글톤 패턴을 구현하는 방법에는 어떤 것들이 있나요?',
    '코틀린에서 스트림이란 무엇인가요?',
    '코틀린에서 람다식을 사용하는 방법에 대해 설명해주세요.',
    '코틀린에서 안드로이드 개발에 어떻게 사용되나요?',
  ],
  REACTJS: [
    '리액트의 특징은 무엇인가요?',
    '리액트에서 가상 돔이란 무엇인가요?',
    '리액트에서 상태 관리를 위한 방법에는 어떤 것들이 있나요?',
    '리액트에서 라우팅을 위한 라이브러리에는 어떤 것들이 있나요?',
    '리액트에서 hooks란 무엇인가요?',
    '리액트에서 컴포넌트 생명주기에는 어떤 단계들이 있나요?',
    '리액트에서 컴포넌트 간 데이터 전달을 위한 방법에는 어떤 것들이 있나요?',
    '리액트에서 CSS 스타일링을 위한 방법에는 어떤 것들이 있나요?',
    '리액트에서 테스트를 위한 방법에는 어떤 것들이 있나요?',
    '리액트에서 서버 사이드 렌더링이란 무엇인가요?',
  ],
  NEXTJS: [
    '넥스트.js의 특징은 무엇인가요?',
    '넥스트.js에서 페이지 라우팅을 위한 방법에는 어떤 것들이 있나요?',
    '넥스트.js에서 서버 사이드 렌더링이란 무엇인가요?',
    '넥스트.js에서 API 라우팅을 위한 방법에는 어떤 것들이 있나요?',
    '넥스트.js에서 글로벌 CSS를 사용하는 방법에 대해 설명해주세요.',
    '넥스트.js에서 커스텀 에러 페이지를 만드는 방법에 대해 설명해주세요.',
    '넥스트.js에서 정적 파일을 처리하는 방법에는 어떤 것들이 있나요?',
    '넥스트.js에서 페이지 퍼포먼스를 최적화하는 방법에는 어떤 것들이 있나요?',
    '넥스트.js에서 인터랙티브한 컴포넌트를 만드는 방법에 대해 설명해주세요.',
    '넥스트.js에서 이미지 최적화를 위한 방법에 대해 설명해주세요.',
  ],
  NESTJS: [
    '네스트.js의 특징은 무엇인가요?',
    '네스트.js에서 컨트롤러란 무엇인가요?',
    '네스트.js에서 사용되는 디코레이터에 대해 설명해주세요.',
    '네스트.js에서 미들웨어란 무엇이며 어떻게 사용되나요?',
    '네스트.js에서 의존성 주입이란 무엇인가요?',
    '네스트.js에서 예외 필터링을 위한 방법에는 어떤 것들이 있나요?',
    '네스트.js에서 유효성 검사를 위한 방법에는 어떤 것들이 있나요?',
    '네스트.js에서 모듈의 엔트리 포인트는 어떻게 설정하나요?',
    '네스트.js에서 ORM을 사용하는 방법에 대해 설명해주세요.',
    '네스트.js에서 파일 업로드를 처리하는 방법에 대해 설명해주세요.',
  ],
  SPRING: [
    '스프링 프레임워크의 특징은 무엇인가요?',
    '스프링에서 디자인 패턴을 사용하는 이유는 무엇인가요?',
    '스프링에서 AOP(Aspect-Oriented Programming)란 무엇인가요?',
    '스프링에서 의존성 주입(Dependency Injection)이란 무엇인가요?',
    '스프링에서 RESTful 웹 서비스를 구현하는 방법에는 어떤 것들이 있나요?',
    '스프링에서 JPA(Java Persistence API)를 사용하는 방법에는 어떤 것들이 있나요?',
    '스프링에서 캐시를 사용하는 방법에는 어떤 것들이 있나요?',
    '스프링에서 스케줄링을 위한 방법에는 어떤 것들이 있나요?',
    '스프링에서 보안을 위한 방법에는 어떤 것들이 있나요?',
    '스프링에서 테스트를 작성하는 방법에는 어떤 것들이 있나요?',
  ],
  CS: [
    '컴퓨터 과학에서 데이터 구조란 무엇인가요?',
    '컴퓨터 과학에서 알고리즘이란 무엇인가요?',
    '컴퓨터 과학에서 스택과 큐의 차이점은 무엇인가요?',
    '컴퓨터 과학에서 트리 구조란 무엇인가요?',
    '컴퓨터 과학에서 그래프 구조란 무엇인가요?',
    '컴퓨터 과학에서 정렬 알고리즘에는 어떤 것들이 있나요?',
    '컴퓨터 과학에서 검색 알고리즘에는 어떤 것들이 있나요?',
    '컴퓨터 과학에서 동적 프로그래밍이란 무엇인가요?',
    '컴퓨터 과학에서 네트워크 프로토콜이란 무엇인가요?',
    '컴퓨터 과학에서 보안 기술에는 어떤 것들이 있나요?',
  ],
};
