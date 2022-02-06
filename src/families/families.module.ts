import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { FamilyRepository } from './family.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyRepository])],
  controllers: [FamiliesController],
  providers: [FamiliesService],
})
export class FamiliesModule {}
