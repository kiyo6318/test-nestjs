import { Family } from 'src/entities/family.entity';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateFamilyDto } from './dto/create-family.dto';
import { FamilyStatus } from './family-status.enum';

@EntityRepository(Family)
export class FamilyRepository extends Repository<Family> {
  async createFamily(createFamilyDto: CreateFamilyDto, user: User) {
    const {
      meetFrequency,
      paymentDueDate,
      possibleDateSelectDay,
      cohabitParentId,
      separateParentId,
      supportOrganizationId,
    } = createFamilyDto;
    const family = this.create({
      meetFrequency,
      paymentDueDate,
      possibleDateSelectDay,
      cohabitParentId,
      separateParentId,
      supporterId: user.id,
      supportOrganizationId,
      status: FamilyStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await this.save(family);

    return family;
  }
}
