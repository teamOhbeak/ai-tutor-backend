import { InterviewEntity } from 'src/domain/interview/entity/interview.entity';
// import { InterviewQuestionsEntity } from '@/domain/interviewQuestions/entity/interviewQuestions.entity';
import { QnaRoom } from 'src/domain/qna-room/entity/qna-room.entity';
import { Qna } from 'src/domain/qna/entity/qna.entity';
import { QuestionBank } from 'src/domain/questionsBank/entity/questionBank.entity';
import { UserEntity } from 'src/domain/user/entity/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { InterviewQuestionEntity } from 'src/domain/interview-question/entity/interview-question.entity';
import { InterviewQuestionAndAnswerEntity } from '../domain/interview-question/entity/interview-question-and-answer.entity';

export default () => ({
  DB: {
    type: 'mysql',
    host: process.env.MODE_ENV === 'local' ? 'mysql' : process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username:
      process.env.MODE_ENV === 'local' ? 'root' : process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      UserEntity,
      InterviewEntity,
      InterviewQuestionEntity, // <-- 제거 되어야 함 -> InterviewQuestionAndAnswerEntity로 대체
      InterviewQuestionAndAnswerEntity,
      QuestionBank,
      Qna,
      QnaRoom,
    ],
    logging: true,
    synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
  },
  NEST: {
    PORT: process.env.BACKEND_PORT,
    HOST:
      process.env.MODE_ENV === 'local'
        ? 'localhost'
        : process.env.BACKEND_HOSTNAME,
  },
  databaseConfig,
  openAIConfig,
});

export const databaseConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE === 'mariadb' ? 'mariadb' : 'mysql',
  // host: 'localhost',
  host: process.env.MODE_ENV === 'local' ? 'localhost' : process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
  autoLoadEntities: true,
  logging: true,
  // entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  // entities: [QuestionBankEntity],
};

export const openAIConfig = process.env.OPEN_API_KEY;
