import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsInt()
  @Min(1)
  @Max(20)
  @Type(() => Number)
  meetFrequency: number;

  @IsInt()
  @Min(1)
  @Max(31)
  @Type(() => Number)
  paymentDueDate: number;

  @IsInt()
  @Min(1)
  @Max(31)
  @Type(() => Number)
  possibleDateSelectDay: number;

  @IsEmail()
  @IsNotEmpty()
  separate_parent_email: string;

  @IsEmail()
  @IsNotEmpty()
  cohabit_parent_email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  separate_parent_name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  cohabit_parent_name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
