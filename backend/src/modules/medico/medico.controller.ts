import { Controller, Get, Post, Body, Param, ParseIntPipe, Query, ValidationPipe} from "@nestjs/common";
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from "./dto/create-medico.dto";

@Controller('medicos')
export class MedicoController {
	constructor(private readonly medicoService: MedicoService) {}

	@Post()
	create(@Body(ValidationPipe) dto: CreateMedicoDto) {
		return this.medicoService.create(dto);
	}

	@Get()
	findAll(
		@Query('especialidadeId', new ParseIntPipe({ optional: true}))
		especialidadeId?: number,
	) {
		return this.medicoService.findAll(especialidadeId);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.medicoService.findOne(id);
	}
}