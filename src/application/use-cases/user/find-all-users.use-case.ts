import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository.js';
import { User } from '../../../domain/entities/user.entity.js';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserWithoutPassword[]> {
    const users = await this.userRepository.findAll();
    return users.map(({ password: _, ...user }) => user);
  }
}
