import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { StackType } from '../../../interface/interview/response/my-interview-detail.response';
import { QuestionStatus } from '../../questionsBank/entity/questionBank.entity';

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

  async submitAnswer(answer: string): Promise<string> {
    const openAI = new OpenAI({
      apiKey: this.configService.get<string>('openAIConfig'),
    });

    const prompt = `당신은 면접질문 어시스턴스입니다. 
    User의 대답을 듣고 옳고 그름을 판단하고, 대답에 대한 평가를 해주세요.
    또한 관련된 꼬리 질문을 1개 더 해주세요. 꼬리질문을 시작할때는 콜론 기호를 사용해 어디부터 꼬리 질문인지 알려주세요.
    당신이 대답할때 실제 면접 상황 처럼 대화 형식으로 자연스럽게 말해주세요.
    User 대답: ${answer}`;

    try {
      const response = await openAI.chat.completions.create({
        model: 'gpt-3.5-turbo-0613',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      });

      if (response.choices && response.choices.length > 0) {
        return response.choices[0].message.content;
      } else {
        throw new Error('No response from OpenAI.');
      }
    } catch (error) {
      throw new Error('Error generating answer: ' + error.message);
    }
  }
}
