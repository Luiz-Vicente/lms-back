import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service.js';
import { PrismaUserRepository } from '../database/repositories/prisma-user.repository.js';
import { UserRepository } from '../../domain/repositories/user.repository.js';
import { JwtStrategy } from '../auth/strategies/jwt.strategy.js';
import { JwtRefreshStrategy } from '../auth/strategies/jwt-refresh.strategy.js';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case.js';
import { RefreshTokenUseCase } from '../../application/use-cases/auth/refresh-token.use-case.js';
import { AuthController } from '../../presentation/controllers/auth.controller.js';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    JwtStrategy,
    JwtRefreshStrategy,
    LoginUseCase,
    RefreshTokenUseCase,
  ],
})
export class AuthModule {}
