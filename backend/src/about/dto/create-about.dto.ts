import { IsString, IsArray, IsOptional, MinLength } from 'class-validator';

export class CreateAboutDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  subtitle: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsArray()
  @IsOptional()
  features?: string[];

  @IsString()
  @IsOptional()
  mainImage?: string;

  @IsString()
  @IsOptional()
  experienceBadgeImage?: string;
}
