import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsString()
  @IsOptional()
  backgroundImage?: string;

  @IsString()
  @IsOptional()
  ctaButtonText?: string;

  @IsString()
  @IsOptional()
  ctaButtonLink?: string;

  @IsString()
  @IsOptional()
  subtitle?: string;
}
