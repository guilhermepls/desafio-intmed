import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateConsultaDto {
  	@IsNumber()
 	@IsNotEmpty()
  	agendaId: number;

  	@IsString()
  	@IsNotEmpty()
  	@Matches(/^\d{2}:\d{2}$/, {
    message: 'O horário deve estar no formato HH:MM',
 	})
 	horario: string;
}