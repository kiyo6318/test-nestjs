import { Module } from '@nestjs/common';
import { FamiliesModule } from './families/families.module';

@Module({
  imports: [FamiliesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
