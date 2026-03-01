import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
