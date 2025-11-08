import { IsString, IsNotEmpty, IsNumber, IsEmail, IsOptional, MaxLength } from 'class-validator';

export class CreateMedicoDto {
	@IsString()
	@IsNotEmpty()
	nome: string;

	@IsNumber()
	@IsNotEmpty()
	crm: number;

	@IsEmail()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	telefone?: string;

	@IsNumber()
	@IsNotEmpty()
	especialidadeId: number;
}

