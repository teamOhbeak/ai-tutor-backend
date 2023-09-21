import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuth(): any {
    return {
      userId: 1,
      userName: '이민규',
    };
  }
}
