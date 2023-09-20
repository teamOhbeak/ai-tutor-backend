import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from '../../provider/database/database.provider';

@Module({
  imports: [TypeOrmModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule { }
