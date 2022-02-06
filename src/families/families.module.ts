import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { FamilyRepository } from './family.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyRepository]), AuthModule],
  controllers: [FamiliesController],
  providers: [FamiliesService],
})
export class FamiliesModule {}
