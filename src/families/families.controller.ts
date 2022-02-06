import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { FamiliesService } from './families.service';
import { Family } from '../entities/family.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorater/get-user.decorater';
import { User } from 'src/entities/user.entity';

@Controller('families')
@UseGuards(JwtAuthGuard)
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Get()
  async findAll(): Promise<Family[]> {
    return await this.familiesService.findAll();
  }

  @Get(':id') //families/id
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Family> {
    return await this.familiesService.findById(id);
  }

  @Post()
  async create(
    @Body() createFamilyDto: CreateFamilyDto,
    @GetUser() user: User,
  ): Promise<Family> {
    return await this.familiesService.create(createFamilyDto, user);
  }

  @Patch(':id')
  async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Family> {
    return await this.familiesService.updateStatus(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.familiesService.delete(id);
  }
}
