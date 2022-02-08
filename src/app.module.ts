import { Module } from '@nestjs/common';
import { FamiliesModule } from './families/families.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ParentsModule } from './parents/parents.module';

@Module({
  imports: [FamiliesModule, TypeOrmModule.forRoot(), AuthModule, OrganizationsModule, ParentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
