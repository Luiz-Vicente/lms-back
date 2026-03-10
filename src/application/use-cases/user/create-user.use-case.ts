import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../../domain/repositories/user.repository.js';
import { User } from '../../../domain/entities/user.entity.js';

type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserInput): Promise<UserWithoutPassword> {
    const emailExists = await this.userRepository.findByEmail(data.email);
    if (emailExists) {
      throw new ConflictException('Email já cadastrado');
    }

    const cpfExists = await this.userRepository.findByCpf(data.cpf);
    if (cpfExists) {
      throw new ConflictException('CPF já cadastrado');
    }

    const hashedPassword: string = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
