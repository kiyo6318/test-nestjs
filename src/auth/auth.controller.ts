import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Supporter } from 'src/entities/supporter.entity';
import { CreateOrganizationDto } from 'src/organizations/dto/create-organization.dto';
import { AuthService } from './auth.service';
import { GetUser } from './decorater/get-user.decorater';
import { Role } from './decorater/role.decorater';
import { CreateSupporterDto } from '../supporters/dto/createSupporter.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { SupporterStatus } from '../supporters/supporter-status.enum';
import { CreateParentDto } from 'src/parents/dto/create-parent.dto';
import { Family } from 'src/entities/family.entity';
import { CreateFamilyDto } from 'src/families/dto/create-family.dto';
import { CreateCustomerDto } from './dto/createCustomer.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @Body() createSupporterDto: CreateSupporterDto,
  ): Promise<Supporter> {
    return await this.authService.signUp(
      createOrganizationDto,
      createSupporterDto,
    );
  }

  @Post('supporters')
  @Role(SupporterStatus.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addSupporter(
    @Body() createSupporterDto: CreateSupporterDto,
    @GetUser() supporter: Supporter,
  ): Promise<Supporter> {
    return await this.authService.addSupporter(createSupporterDto, supporter);
  }

  @Post('customers')
  @Role(SupporterStatus.ADMIN, SupporterStatus.GENERAL)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @GetUser() supporter: Supporter,
  ): Promise<Family> {
    return await this.authService.addCustomer(createCustomerDto, supporter);
  }

  @Post('signin')
  async signin(
    @Body() credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(credentialsDto);
  }
}
