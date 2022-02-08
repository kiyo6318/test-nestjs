import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ParentStatus } from 'src/auth/parent-status.enum';

export class CreateParentDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  parent_name: string;

  @IsEnum(ParentStatus)
  status: ParentStatus;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
