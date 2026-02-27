import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  qualification?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  specializations?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  departmentDescription?: string;

  @IsOptional()
  @IsString()
  departmentHref?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  expertise?: string[];

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
