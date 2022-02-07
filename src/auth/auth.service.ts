import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { OrganizationRepository } from 'src/organizations/organization.repository';
import { SupporterRepository } from './supporter.repository';
import { CreateOrganizationDto } from 'src/organizations/dto/create-organization.dto';
import { CreateSupporterDto } from './dto/createSupporter.dto';
import { Supporter } from 'src/entities/supporter.entity';
import { Organization } from 'src/entities/organization.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
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
    organization: Organization,
  ): Promise<Supporter> {
    return await this.supporterRepository.createSupporter(
      createSupporterDto,
      organization,
    );
  }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = credentialsDto;
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, email: user.email, status: user.status };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }

    throw new UnauthorizedException(
      'メールアドレスまたはパスワードを確認してください',
    );
  }
}
