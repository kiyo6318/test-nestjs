import { Injectable, NotFoundException } from '@nestjs/common';
import { ParentStatus } from 'src/auth/parent-status.enum';
import { Family } from 'src/entities/family.entity';
import { Organization } from 'src/entities/organization.entity';
import { Parent } from 'src/entities/parent.entity';
import { Supporter } from 'src/entities/supporter.entity';
import { CreateParentDto } from './dto/create-parent.dto';
import { ParentRepository } from './parent.repository';

@Injectable()
export class ParentsService {
  constructor(private parentRepository: ParentRepository) {}

  async findAll(): Promise<Parent[]> {
    return await this.parentRepository.find();
  }

  async findById(id: string): Promise<Parent> {
    const parent = await this.parentRepository.findOne(id);
    if (!parent) {
      throw new NotFoundException();
    }
    return parent;
  }

  async findBySupporter(supporter: Supporter): Promise<Parent[]> {
    return await this.parentRepository.find({
      supporter: supporter,
    });
  }

  async findByFamily(family: Family): Promise<Parent[]> {
    return await this.parentRepository.find({
      family: family,
    });
  }

  async findBySupportOrganization(
    supportOrganization: Organization,
  ): Promise<Parent[]> {
    return await this.parentRepository.find({
      supportOrganization: supportOrganization,
    });
  }

  async createSeparateParent(
    createParentInput: CreateParentDto,
    family: Family,
    supporter: Supporter,
    supportOrganization: Organization,
  ): Promise<Parent> {
    return await this.parentRepository.createParent(
      createParentInput,
      ParentStatus.SEPARATE_PARENT,
      family,
      supporter,
      supportOrganization,
    );
  }

  async createCohabitParent(
    createParentInput: CreateParentDto,
    family: Family,
    supporter: Supporter,
    supportOrganization: Organization,
  ): Promise<Parent> {
    return await this.parentRepository.createParent(
      createParentInput,
      ParentStatus.COHABIT_PARENT,
      family,
      supporter,
      supportOrganization,
    );
  }
}
