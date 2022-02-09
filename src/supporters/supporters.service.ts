import { Injectable, NotFoundException } from '@nestjs/common';
import { Organization } from 'src/entities/organization.entity';
import { Parent } from 'src/entities/parent.entity';
import { Supporter } from 'src/entities/supporter.entity';
import { CreateSupporterDto } from './dto/createSupporter.dto';
import { SupporterRepository } from './supporter.repository';

@Injectable()
export class SupportersService {
  constructor(private supporterRepository: SupporterRepository) {}

  async findAll(): Promise<Supporter[]> {
    return await this.supporterRepository.find();
  }

  async findById(id: string): Promise<Supporter> {
    const supporter = await this.supporterRepository.findOne(id, {
      relations: ['organizations'],
    });
    if (!supporter) {
      throw new NotFoundException();
    }
    return supporter;
  }

  async findByOrganization(organization: Organization): Promise<Supporter[]> {
    return await this.supporterRepository.find({
      organization: organization,
    });
  }

  async findByParent(parent: Parent): Promise<Supporter> {
    const supporter = await this.supporterRepository.findOne(
      parent.supporter.id,
      {
        relations: ['organizations'],
      },
    );
    if (!supporter) {
      throw new NotFoundException();
    }
    return supporter;
  }

  async createSupporter(
    createSupporterInput: CreateSupporterDto,
    organization: Organization,
  ): Promise<Supporter> {
    return await this.supporterRepository.createSupporter(
      createSupporterInput,
      organization,
    );
  }
}
