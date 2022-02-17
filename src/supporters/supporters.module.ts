import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { SupporterRepository } from './supporter.repository';
import { SupportersService } from './supporters.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupporterRepository])],
  controllers: [],
  providers: [SupportersService],
  exports: [SupportersService],
})
export class SupportersModule {}
