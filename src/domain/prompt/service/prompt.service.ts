import { Qna } from '@/domain/qna/entity/qna.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export interface InterviewQuestion {
  JAVA: string[];
  JAVASCRIPT: string[];
  KOTLIN: string[];
  REACTJS: string[];
  NEXTJS: string[];
  NESTJS: string[];
  SPRINT: string[];
  CS: string[];
}
@Injectable()
export class PromptService {
  constructor(private readonly configService: ConfigService) {}

  async getInterviewQuestionsPrompt(): Promise<InterviewQuestion> {
    const openAI = new OpenAI({
      apiKey: this.configService.get<string>('openAIConfig'),
    });

    const schema = {
      type: 'object',
      properties: {
        JAVA: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        JAVASCRIPT: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        KOTLIN: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        REACTJS: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        NEXTJS: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        NESTJS: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        SPRING: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        CS: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    };

    const schema2 = {
      type: 'object',
      properties: {
        stack: {
          items: {
            type: 'string',
            enum: [
              'JAVA',
              'JAVASCRIPT',
              'KOTLIN',
              'REACTJS',
              'NEXTJS',
              'NESTJS',
              'SPRING',
              'CS',
            ],
          },
        },
        question: {
          items: {
            type: 'string',
          },
        },
        status: {
          type: 'string',
          items: {
            type: 'number',
            enum: ["'NOT_ANSWERED'", "'ANSWERED'"],
          },
        },
      },
    };

    const promptResult = await openAI.chat.completions
      .create({
        messages: [
          { role: 'system', content: '당신은 면접질문 어시스턴스 입니다.' },
          {
            role: 'user',
            content: '각 해당하는 항목에 대한 면접 질문을 10개씩 return 해줘',
          },
        ],
        functions: [{ name: 'set_questions', parameters: schema }],
        function_call: { name: 'set_questions' },
        model: 'gpt-3.5-turbo-0613',
      })
      .then((competions) => {
        const generateText =
          competions.choices[0].message.function_call.arguments;

        return JSON.parse(generateText);
      })
      .catch((err) => {
        return { error: err.message };
      });

    return promptResult;
  }
  async getQnaPrompt(question: string, qnaList: Qna[]): Promise<any> {
    const openAI = new OpenAI({
      apiKey: this.configService.get<string>('openAIConfig'),
    });

    console.log('apiToken: ' + openAI.apiKey);

    const schema = {
      type: 'object',
      properties: {
        answer: {
          type: 'string',
          items: {
            type: 'string',
          },
        },
      },
    };

    const messages = [];

    if (qnaList && qnaList.length > 0) {
      // Iterate through qnaList and push each Qna's question and answer as messages
      qnaList.forEach((qna) => {
        if (
          qna.question !== null &&
          qna.answer !== '답변이 없습니다.' &&
          qna.answer !== ''
        ) {
          messages.push({
            role: 'user',
            content: qna.question,
          });
          messages.push({
            role: 'system',
            content: qna.answer,
          });
        }
      });
    }
    messages.push(
      {
        role: 'system',
        content:
          '당신은 코딩 및 CS 관련 질문에 답변을 하는 튜터에요.' +
          '\n 질문에 답변을 해주세요.' +
          // '\n 질문의 의도가 이해되지 않는데면 질문을 파악하기 위한 다른 질문을 해도 되요.' +
          '\n 다만 절대로 질문자의 질문을 똑같이 반복해서 물어보지 마세요.' +
          // '\n 질문자가 질문을 잘못했을 수도 있으니까요.' +
          '\n 그리고 최대한 구체적으로 답변을 해주세요.' +
          '\n 설명은 한국어로 해주세요. \n 그리고 20대의 친근한 여성처럼 부드럽게 답변해주세요.',
      },
      {
        role: 'user',
        content: question,
      },
    );

    console.log(messages);

    const promptResult = await openAI.chat.completions
      .create({
        messages: messages,
        functions: [{ name: 'set_questions', parameters: schema }],
        function_call: { name: 'set_questions' },
        model: 'gpt-3.5-turbo-0613',
      })
      .then((competions) => {
        const generateText =
          competions.choices[0].message.function_call.arguments;

        return JSON.parse(generateText);
      })
      .catch((err) => {
        console.log('open ai error.');
        console.log(err.message);
        return { error: err.message };
      });

    return promptResult;
  }
}
