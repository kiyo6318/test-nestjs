import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import { SupporterRepository } from '../supporters/supporter.repository';
import { CreateOrganizationDto } from 'src/organizations/dto/create-organization.dto';
import { CreateSupporterDto } from '../supporters/dto/createSupporter.dto';
import { Supporter } from 'src/entities/supporter.entity';
import { CreateFamilyDto } from 'src/families/dto/create-family.dto';
import { CreateParentDto } from 'src/parents/dto/create-parent.dto';
import { Family } from 'src/entities/family.entity';
import { SupportersService } from 'src/supporters/supporters.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { FamiliesService } from 'src/families/families.service';
import { ParentsService } from 'src/parents/parents.service';

@Injectable()
export class AuthService {
  constructor(
    private familiesService: FamiliesService,
    private parentsService: ParentsService,
    private supportersService: SupportersService,
    private organizationsService: OrganizationsService,
    private jwtService: JwtService,
  ) {}

  async signUp(
    createOrganizationInput: CreateOrganizationDto,
    createSupporterInput: CreateSupporterDto,
  ): Promise<Supporter> {
    const organization = await this.organizationsService.createOrganization(
      createOrganizationInput,
    );
    return await this.supportersService.createSupporter(
      createSupporterInput,
      organization,
    );
  }

  async addSupporter(
    createSupporterInput: CreateSupporterDto,
    supporter: Supporter,
  ): Promise<Supporter> {
    const organization = await this.organizationsService.findById(
      supporter.organizationId,
    );
    return await this.supportersService.createSupporter(
      createSupporterInput,
      organization,
    );
  }

  async addCustomer(
    createFamilyInput: CreateFamilyDto,
    createSeparateParentInput: CreateParentDto,
    createCohabitParentInput: CreateParentDto,
    supporter: Supporter,
  ): Promise<Family> {
    const organization = await this.organizationsService.findById(
      supporter.organizationId,
    );
    const family = await this.familiesService.createFamily(createFamilyInput);
    const separateParent = await this.parentsService.createSeparateParent(
      createSeparateParentInput,
      family,
      supporter,
      organization,
    );
    const cohabitParent = await this.parentsService.createCohabitParent(
      createCohabitParentInput,
      family,
      supporter,
      organization,
    );
    family.parents = [...family.parents, separateParent, cohabitParent];

    return family;
  }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = credentialsDto;
    const supporter = await this.supportersService.findOne({ email });

    if (supporter && (await bcrypt.compare(password, supporter.password))) {
      const payload = {
        id: supporter.id,
        email: supporter.email,
        status: supporter.status,
      };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }

    throw new UnauthorizedException(
      'メールアドレスまたはパスワードを確認してください',
    );
  }
}
