import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { FamiliesService } from './families.service';
import { Family } from './family.model';

@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Get()
  findAll(): Family[] {
    return this.familiesService.findAll();
  }

  @Get(':id') //families/id
  findById(@Param('id', ParseUUIDPipe) id: string): Family {
    return this.familiesService.findById(id);
  }

  @Post()
  create(@Body() createFamilyDto: CreateFamilyDto): Family {
    return this.familiesService.create(createFamilyDto);
  }

  @Patch(':id')
  updateStatus(@Param('id', ParseUUIDPipe) id: string): Family {
    return this.familiesService.updateStatus(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    this.familiesService.delete(id);
  }
}
