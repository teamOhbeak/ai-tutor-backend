import { Module } from '@nestjs/common';
import { AuthController } from 'src/interface/auth/auth.controller';

@Module({
  imports: [],
  controllers: [
    AuthController
  ],
  providers: [],
})
export class AuthModule {

}