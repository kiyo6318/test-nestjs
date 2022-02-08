import { Family } from 'src/entities/family.entity';
import { Organization } from 'src/entities/organization.entity';
import { Parent } from 'src/entities/parent.entity';
import { Supporter } from 'src/entities/supporter.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateParentDto } from './dto/create-parent.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(Parent)
export class ParentRepository extends Repository<Parent> {
  async createParent(
    createParentDto: CreateParentDto,
    family: Family,
    supporter: Supporter,
    supportOrganization: Organization,
  ) {
    const { email, parent_name, status, password } = createParentDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const parent = this.create({
      email,
      name: parent_name,
      status,
      password: hashPassword,
      family,
      supporter,
      supportOrganization,
    });

    await this.save(parent);
    return parent;
  }
}
