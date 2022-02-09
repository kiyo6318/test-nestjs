import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationRepository } from 'src/organizations/organization.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './jwt.strategy';
import { SupporterRepository } from '../supporters/supporter.repository';
import { UserRepository } from './user.repository';
import { SupportersService } from 'src/supporters/supporters.service';
import { FamiliesService } from 'src/families/families.service';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrganizationRepository,
      SupporterRepository,
      UserRepository,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey123',
      signOptions: {
        expiresIn: 2592000,
      },
    }),
    SupportersService,
    FamiliesService,
    OrganizationsService,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SupportersService,
    FamiliesService,
    OrganizationsService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [JwtStrategy, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
