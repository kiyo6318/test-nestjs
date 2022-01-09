import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsUUID, Max, Min } from 'class-validator';

export class CreateFamilyDto {
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

  @IsUUID()
  @IsNotEmpty()
  cohabitParentId: string;

  @IsUUID()
  @IsNotEmpty()
  separateParentId: string;

  @IsUUID()
  @IsNotEmpty()
  supporterId: string;

  @IsUUID()
  @IsNotEmpty()
  supportOrganizationId: string;
}
