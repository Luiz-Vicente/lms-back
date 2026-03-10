import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository.js';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const exists = await this.userRepository.findById(id);
    if (!exists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.userRepository.delete(id);
  }
}
