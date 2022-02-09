import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SupporterRepository } from './supporter.repository';
import { SupportersService } from './supporters.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupporterRepository]), AuthModule],
  controllers: [],
  providers: [SupportersService],
})
export class SupportersModule {}
