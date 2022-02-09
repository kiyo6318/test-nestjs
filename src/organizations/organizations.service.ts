import { Injectable, NotFoundException } from '@nestjs/common';
import { Organization } from 'src/entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationRepository } from './organization.repository';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}
  private organizations: Organization[] = [];

  async findById(id: string): Promise<Organization> {
    const found = await this.organizationRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async createOrganization(
    createOrganizationInput: CreateOrganizationDto,
  ): Promise<Organization> {
    return await this.organizationRepository.createOrganization(
      createOrganizationInput,
    );
  }

  async delete(id: string): Promise<void> {
    await this.organizationRepository.delete({ id });
  }
}
