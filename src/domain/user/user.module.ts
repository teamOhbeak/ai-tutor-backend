import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [UserService, UserRepository],
})
export class UserModule {}
