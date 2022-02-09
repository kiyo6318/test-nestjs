import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { FamilyStatus } from './family-status.enum';
import { Family } from '../entities/family.entity';
import { FamilyRepository } from './family.repository';

@Injectable()
export class FamiliesService {
  constructor(private readonly familyRepository: FamilyRepository) {}
  private families: Family[] = [];

  async findAll(): Promise<Family[]> {
    return await this.familyRepository.find();
  }

  async findById(id: string): Promise<Family> {
    const family = await this.familyRepository.findOne(id);
    if (!family) {
      throw new NotFoundException();
    }
    return family;
  }

  async createFamily(createFamilyDto: CreateFamilyDto): Promise<Family> {
    return await this.familyRepository.createFamily(createFamilyDto);
  }

  async updateStatus(id: string): Promise<Family> {
    const family = await this.findById(id);
    family.status = FamilyStatus.INACTIVE;
    family.updatedAt = new Date().toISOString();
    await this.familyRepository.save(family);
    return family;
  }

  async delete(id: string): Promise<void> {
    await this.familyRepository.delete({ id });
  }
}
