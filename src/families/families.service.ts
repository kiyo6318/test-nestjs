import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { FamilyStatus } from './family-status.enum';
import { Family } from '../entities/family.entity';
import { FamilyRepository } from './family.repository';

@Injectable()
export class FamiliesService {
  constructor(private readonly familyRepository: FamilyRepository) {}
  private families: Family[] = [];

  findAll(): Family[] {
    return this.families;
  }

  findById(id: string): Family {
    const found = this.families.find((family) => family.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createFamilyDto: CreateFamilyDto): Promise<Family> {
    return await this.familyRepository.createFamily(createFamilyDto);
  }

  updateStatus(id: string): Family {
    const family = this.findById(id);
    family.status = FamilyStatus.INACTIVE;
    return family;
  }

  delete(id: string): void {
    this.families = this.families.filter((family) => family.id != id);
  }
}
