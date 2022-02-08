import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { OrganizationRepository } from 'src/organizations/organization.repository';
import { SupporterRepository } from './supporter.repository';
import { CreateOrganizationDto } from 'src/organizations/dto/create-organization.dto';
import { CreateSupporterDto } from './dto/createSupporter.dto';
import { Supporter } from 'src/entities/supporter.entity';
import { CreateFamilyDto } from 'src/families/dto/create-family.dto';
import { CreateParentDto } from 'src/parents/dto/create-parent.dto';
import { Family } from 'src/entities/family.entity';
import { FamilyRepository } from 'src/families/family.repository';
import { ParentRepository } from 'src/parents/parent.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private familyRepository: FamilyRepository,
    private parentRepository: ParentRepository,
    private supporterRepository: SupporterRepository,
    private organizationRepository: OrganizationRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    createOrganizationDto: CreateOrganizationDto,
    createSupporterDto: CreateSupporterDto,
  ): Promise<Supporter> {
    const organization = await this.organizationRepository.createOrganization(
      createOrganizationDto,
    );
    return await this.supporterRepository.createSupporter(
      createSupporterDto,
      organization,
    );
  }

  async addSupporter(
    createSupporterDto: CreateSupporterDto,
    supporter: Supporter,
  ): Promise<Supporter> {
    const organization = await this.organizationRepository.findOne(
      supporter.organizationId,
    );
    return await this.supporterRepository.createSupporter(
      createSupporterDto,
      organization,
    );
  }

  // async addCustomer(
  //   createFamilyDto: CreateFamilyDto,
  //   createParentDto: CreateParentDto,
  //   supporter: Supporter,
  // ): Promise<Family> {
  //   const family = await this.familyRepository.createFamily(createFamilyDto);
  //   const separateParent = await this.parentRepository.createParent(createParentDto);
  // }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = credentialsDto;
    const supporter = await this.supporterRepository.findOne({ email });

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
