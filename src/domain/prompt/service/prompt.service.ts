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
  constructor(private readonly configService: ConfigService) { }

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
  async getQnaPrompt(question: string, qna: Qna): Promise<any> {
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

    const promptResult = await openAI.chat.completions
      .create({
        messages: [
          {
            role: 'system',
            content: qna != null ? qna.question : '이전 질문이 없습니다.',
          },
          {
            role: 'user',
            content: qna != null ? qna.answer : '이전 답변이 없습니다.',
          },
          {
            role: 'system',
            content: '당신은 질문의 답변을 하는 IT 에시스턴스 입니다.',
          },
          {
            role: 'user',
            content: question,
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
        console.log(err.message);
        return { error: err.message };
      });

    return promptResult;
  }
}
