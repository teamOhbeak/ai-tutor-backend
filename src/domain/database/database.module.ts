import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from '../../provider/database/database.provider';
import { InterviewEntity } from '../interview/entity/interview.entity';

// @Module({
//   imports: [TypeOrmModule],
//   providers: [...databaseProviders],
//   exports: [...databaseProviders],
// })
// export class DatabaseModule {}
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 데이터베이스 타입 (예: mysql, postgres, sqlite 등)
      host: 'team500-aitutor.mysql.database.azure.com', // 데이터베이스 호스트
      port: 3306, // 데이터베이스 포트
      username: 'teamohback', // 데이터베이스 사용자 이름
      password: '1Emdgkwk@@', // 데이터베이스 비밀번호
      database: 'test', // 사용할 데이터베이스 이름
      entities: [InterviewEntity], // Entity 클래스들을 여기에 추가
      synchronize: true, // 앱 실행 시 스키마 자동 동기화 여부
    }),
  ],
})
export class DatabaseModule {}
