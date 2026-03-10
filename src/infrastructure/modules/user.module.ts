import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { PrismaUserRepository } from '../database/repositories/prisma-user.repository.js';
import { UserRepository } from '../../domain/repositories/user.repository.js';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case.js';
import { FindUserByIdUseCase } from '../../application/use-cases/user/find-user-by-id.use-case.js';
import { FindAllUsersUseCase } from '../../application/use-cases/user/find-all-users.use-case.js';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case.js';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case.js';
import { UserController } from '../../presentation/controllers/user.controller.js';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    CreateUserUseCase,
    FindUserByIdUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
