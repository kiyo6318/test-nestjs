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
import { GetSupporter } from './decorater/get-supporter.decorater';
import { CreateSupporterDto } from './dto/createSupporter.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  async addSupporter(
    @Body() createSupporterDto: CreateSupporterDto,
    @GetSupporter() supporter: Supporter,
  ): Promise<Supporter> {
    return await this.authService.addSupporter(
      createSupporterDto,
      supporter.organization,
    );
  }

  @Post('signin')
  async signin(
    @Body() credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(credentialsDto);
  }
}
