import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SupporterStatus } from '../supporter-status.enum';

export class CreateSupporterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  supporter_name: string;

  @IsEnum(SupporterStatus)
  status: SupporterStatus;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
