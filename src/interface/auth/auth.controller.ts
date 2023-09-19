import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { LoginRequest } from "src/interface/auth/request/login.reqeust";
import { AuthResponse } from "src/interface/auth/response/auth.response";

@Controller('api/auth')
export class AuthController {
  
  constructor() {}

  @Post()
  @ApiCreatedResponse()
  async login(
    @Body() param: LoginRequest) 
  : Promise<AuthResponse> {
    const auth = new AuthResponse(); 
    auth.userId = 1;
    auth.userName = '김오백';
    auth.token = auth.userId.toString();
    
    return auth;
  }
}