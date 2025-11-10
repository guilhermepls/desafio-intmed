import { Controller, Get, Post, Body, ValidationPipe } from "@nestjs/common";
import { EspecialidadeService } from './especialidade.service'; 
import { CreateEspecialidadeDto } from "./dto/create-especialidade.dto";

@Controller('especialidades') 
export class EspecialidadesController {
	constructor(private readonly especialidadeService: EspecialidadeService) {}

	@Post()
	create(@Body(ValidationPipe) dto: CreateEspecialidadeDto) { 
		return this.especialidadeService.create(dto); 
	}

	@Get()
	findAll() {
		return this.especialidadeService.findAll(); 
	}
}