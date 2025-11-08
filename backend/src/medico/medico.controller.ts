import { Controller, Get, Post, Body, Param, ParseIntPipe } from "@nestjs/common";
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from "./entities/dto/create-medico.dto";

@Controller('medicos')
export class MedicoController {
	constructor(private readonly medicoService: MedicoService) {}

	@Post()
	create(@Body() dto: CreateMedicoDto) {
		return this.medicoService.create(dto);
	}

	@Get()
	findAll() {
		return this.medicoService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.medicoService.findOne(id);
	}
}

