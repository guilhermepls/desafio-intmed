import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNumber, IsOptional, } from 'class-validator';

export class FindAgendasQueryDto {
  	@IsOptional()
  	@IsArray()
  	@IsNumber({}, { each: true })
  	@Type(() => Number)
  	medico?: number[];

  	@IsOptional()
  	@IsArray()
  	@IsNumber({}, { each: true })
  	@Type(() => Number)
  	crm?: number[];

  	@IsOptional()
  	@IsDateString()
  	data_inicio?: string;

  	@IsOptional()
  	@IsDateString()
  	data_final?: string;
}