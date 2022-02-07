import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  org_name: string;
}
