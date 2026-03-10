import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../../domain/repositories/user.repository.js';
import { User } from '../../../domain/entities/user.entity.js';

type UpdateUserInput = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    id: string,
    data: UpdateUserInput,
  ): Promise<UserWithoutPassword> {
    const exists = await this.userRepository.findById(id);
    if (!exists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.userRepository.update(id, data);
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
