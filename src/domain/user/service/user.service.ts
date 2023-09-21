import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(userId: number): Promise<UserEntity> {
    return this.userRepository.findUserById(userId);
  }
}
