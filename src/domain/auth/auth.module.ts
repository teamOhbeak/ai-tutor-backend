import { Module } from '@nestjs/common';
import { AuthController } from 'src/interface/auth/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    AuthService
  ],
})
export class AuthModule {}
