import { IsString, IsNotEmpty, MaxLength } from 'class-validator';  

export class CreateEspecialidadeDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	nome: string; 
}