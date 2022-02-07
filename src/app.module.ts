import { Module } from '@nestjs/common';
import { FamiliesModule } from './families/families.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [FamiliesModule, TypeOrmModule.forRoot(), AuthModule, OrganizationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
