import { Module } from '@nestjs/common';
import { QnaRoomQnaController } from 'src/interface/qna-room-qna/qna-room-qna.controller';
import { QnaRoomController } from 'src/interface/qna-room/qna-room.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
@Module({
  imports: [],
  controllers: [],
  providers: [
    UserService, 
    UserRepository,
  ],
})
export class UserModule {}