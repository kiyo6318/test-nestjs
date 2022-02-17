import { Family } from 'src/entities/family.entity';
import { Organization } from 'src/entities/organization.entity';
import { Parent } from 'src/entities/parent.entity';
import { Supporter } from 'src/entities/supporter.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateParentDto } from './dto/create-parent.dto';
import * as bcrypt from 'bcrypt';
import { ParentStatus } from 'src/auth/parent-status.enum';

@EntityRepository(Parent)
export class ParentRepository extends Repository<Parent> {
  async createParent(
    createParentInput: CreateParentDto,
    status: ParentStatus,
    family: Family,
    supporter: Supporter,
    supportOrganization: Organization,
  ) {
    const { email, parent_name, password } = createParentInput;
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await this.save(parent);
    return parent;
  }
}
