import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ParentRepository } from './parent.repository';
import { ParentsController } from './parents.controller';
import { ParentsService } from './parents.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParentRepository]), AuthModule],
  controllers: [ParentsController],
  providers: [ParentsService],
})
export class ParentsModule {}
