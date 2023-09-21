import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  
  async getAuth(): Promise<any> {
    return {
      userId: 1,
      userName: '이민규'
    }
  }
}