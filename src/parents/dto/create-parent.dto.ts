import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateParentDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  parent_name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
