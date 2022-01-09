import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { FamilyStatus } from './family-status.enum';
import { Family } from './family.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FamiliesService {
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

  create(createFamilyDto: CreateFamilyDto): Family {
    const family: Family = {
      id: uuid(),
      ...createFamilyDto,
      status: FamilyStatus.ACTIVE,
    };
    this.families.push(family);
    return family;
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
