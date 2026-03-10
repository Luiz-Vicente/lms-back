import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository.js';
import { User } from '../../../domain/entities/user.entity.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async update(
    id: string,
    data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<User> {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { cpf } });
  }
}
