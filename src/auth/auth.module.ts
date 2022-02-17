import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './jwt.strategy';
import { SupportersModule } from 'src/supporters/supporters.module';
import { FamiliesModule } from 'src/families/families.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { ParentsModule } from 'src/parents/parents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyRepository } from 'src/families/family.repository';
import { OrganizationRepository } from 'src/organizations/organization.repository';
import { SupporterRepository } from 'src/supporters/supporter.repository';
import { ParentRepository } from 'src/parents/parent.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrganizationRepository,
      SupporterRepository,
      FamilyRepository,
      ParentRepository,
    ]),
    SupportersModule,
    FamiliesModule,
    OrganizationsModule,
    ParentsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey123',
      signOptions: {
        expiresIn: 2592000,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
  exports: [AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
