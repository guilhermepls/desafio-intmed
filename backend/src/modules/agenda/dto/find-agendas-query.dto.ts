import { Type, Transform } from 'class-transformer';
import { IsArray, IsDateString, IsNumber, IsOptional, } from 'class-validator';

export class FindAgendasQueryDto {
  	@IsOptional()
  	@Type(() => Number)
	@Transform(({ value }) => (value && !Array.isArray(value) ? [value] : value))
	@IsArray()
	@IsNumber({}, { each: true })
  	medico?: number[];

  	@IsOptional()
	@Type(() => Number)
  	@Transform(({ value }) => (value && !Array.isArray(value) ? [value] : value))
  	@IsArray()
  	@IsNumber({}, { each: true })
  	crm?: number[];

  	@IsOptional()
  	@IsDateString()
  	data_inicio?: string;

  	@IsOptional()
  	@IsDateString()
  	data_final?: string;
}