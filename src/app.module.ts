import { Module } from '@nestjs/common';
import { FamiliesModule } from './families/families.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ParentsModule } from './parents/parents.module';
import { SupportersModule } from './supporters/supporters.module';
import { SupportersService } from './supporters/supporters.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    SupportersModule,
    FamiliesModule,
    ParentsModule,
    OrganizationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
