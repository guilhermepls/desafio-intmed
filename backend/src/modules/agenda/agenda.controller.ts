import { Controller, Get, Post, Body, Param, ParseIntPipe, ValidationPipe } from "@nestjs/common";
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from "./dto/create-agenda.dto";

@Controller('agendas')
export class AgendaController {
	constructor(private readonly agendaService: AgendaService) {}

	@Post()
	create(@Body(ValidationPipe) dto: CreateAgendaDto) {
		return this.agendaService.create(dto);
	}

	@Get()
	findAll() {
		return this.agendaService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.agendaService.findOne(id);
	}
}

