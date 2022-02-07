import { Organization } from 'src/entities/organization.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {
  async createOrganization(createOrganizationDto: CreateOrganizationDto) {
    const { org_name } = createOrganizationDto;
    const organization = this.create({
      name: org_name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await this.save(organization);

    return organization;
  }
}
