import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { PromptService } from '../../prompt/service/prompt.service';

@Injectable()
export class QuestionsBankService {
  constructor(private readonly promptService: PromptService) {}

  //TODO: 매일 자정에 실행되도록 설정
  // GPT에게 물어보던지 아니면 크롤링을 하던지
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async questionCollector() {
    const prompt = `
    AI Tutor: 안녕하세요. 저는 AI Tutor입니다. 오늘 질문할 아래 항목들을 가져오겠스니다. 
    오늘 질문할  JAVA, JAVASCRIPT, KOTLIN, REACTJS, NEXTJS, NODEJS, NESTJS, SPRING, CS 각 각 10개씩 JSON 형식으로 질문을 대체해서 가져와줘 
    - 언어 : 한글
    - 포멧 : JSON
    - 질문 항목 : JAVA, JAVASCRIPT, KOTLIN, REACTJS, NEXTJS, NODEJS, NESTJS, SPRING, CS
    - 질문 갯수 : 1개씩
    
    {
        "JAVA" : [
            "question1": "질문",
            "question2": "질문",
            "question3": "질문",
            "question4": "질문",
            "question5": "질문",
            "question6": "질문",
            "question7": "질문",
            "question8": "질문",
            "question9": "질문",
            "question10": "질문"

        ],
        "JAVASCRIPT" : [
            "question1": "질문",
            "question2": "질문",
            "question3": "질문",
            "question4": "질문",
            "question5": "질문",
            "question6": "질문",
            "question7": "질문",
            "question8": "질문",
            "question9": "질문",
            "question10": "질문"
        ],
        "KOTLIN" : [
            "question1": "질문",
            "question2": "질문",
            "question3": "질문",
            "question4": "질문",
            "question5": "질문",
            "question6": "질문",
            "question7": "질문",
            "question8": "질문",
            "question9": "질문",
            "question10": "질문"
            
        ],
        "REACTJS" : [
            "question1": "질문",
            "question2": "질문",
            "question3": "질문",
            "question4": "질문",
            "question5": "질문",
            "question6": "질문",
            "question7": "질문",
            "question8": "질문",
            "question9": "질문",
            "question10": "질문"
            
        ],
        "NEXTJS" : [
            "question1": "질문",
            "question2": "질문",
            "question3": "질문",
            "question4": "질문",
            "question5": "질문",
            "question6": "질문",
            "question7": "질문",
            "question8": "질문",
            "question9": "질문",
            "question10": "질문"
        ],
        "NODEJS" : [
            "question1": "질문",
            "question2": "질문",
            "question3": "질문",
            "question4": "질문",
            "question5": "질문",
            "question6": "질문",
            "question7": "질문",
            "question8": "질문",
            "question9": "질문",
            "question10": "질문"
        ],
        "NESTJS" : [
            "question1": "질문",
            "question2": "질문",
            "question3": "질문",
            "question4": "질문",
            "question5": "질문",
            "question6": "질문",
            "question7": "질문",
            "question8": "질문",
            "question9": "질문",
            "question10": "질문"
        ],
        "SPRING" : [
            "question1": "질문",
            "question2": "질문",
            "question3": "질문",
            "question4": "질문",
            "question5": "질문",
            "question6": "질문",
            "question7": "질문",
            "question8": "질문",
            "question9": "질문",
            "question10": "질문"
        ],
        "CS" : [
            "question1": "질문",
            "question2": "질문",
            "question3": "질문",
            "question4": "질문",
            "question5": "질문",
            "question6": "질문",
            "question7": "질문",
            "question8": "질문",
            "question9": "질문",
            "question10": "질문"
        ]
    }    
    `;

    const promptResult = await this.promptService.getTutorPrompt(prompt);

    console.log(promptResult);

    return promptResult;
  }
}

export enum QuestionType {
  JAVA = 0,
  JAVASCRIPT = 1,
  KOTLIN = 2,
  REACTJS = 3,
  NEXTJS = 4,
  NODEJS = 5,
  NESTJS = 6,
  SPRING = 7,
  CS = 8,
}

export class Question {
  questionId: number;
  questionType: QuestionType;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}
