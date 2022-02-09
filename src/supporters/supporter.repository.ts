import { Organization } from 'src/entities/organization.entity';
import { Supporter } from 'src/entities/supporter.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSupporterDto } from './dto/createSupporter.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(Supporter)
export class SupporterRepository extends Repository<Supporter> {
  async createSupporter(
    createSupporterDto: CreateSupporterDto,
    organization: Organization,
  ) {
    const { email, supporter_name, status, password } = createSupporterDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const supporter = this.create({
      email,
      name: supporter_name,
      status,
      password: hashPassword,
      organizationId: organization.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await this.save(supporter);
    return supporter;
  }
}
