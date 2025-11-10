import { IsNumber, IsNotEmpty, IsString, IsArray, ArrayMinSize } from 'class-validator';

export class CreateAgendaDto {
	@IsNumber()
	@IsNotEmpty()
	medicoId: number;

	@IsString()
	@IsNotEmpty()
	dia: string;

	@IsArray()
	@ArrayMinSize(1)
	horarios: string[];
}