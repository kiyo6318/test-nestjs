import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { Organization } from 'src/entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get(':id') //organizations/id
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Organization> {
    return await this.organizationsService.findById(id);
  }

  @Post()
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return await this.organizationsService.createOrganization(
      createOrganizationDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.organizationsService.delete(id);
  }
}
