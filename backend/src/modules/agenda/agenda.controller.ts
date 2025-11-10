import { Controller, Get, Post, Body, Param, ParseIntPipe, ValidationPipe, Query } from "@nestjs/common";
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from "./dto/create-agenda.dto";
import { FindAgendasQueryDto } from "./dto/find-agendas-query.dto";

@Controller('agendas')
export class AgendaController {
	constructor(private readonly agendaService: AgendaService) {}

	@Post()
	create(@Body(ValidationPipe) dto: CreateAgendaDto) {
		return this.agendaService.create(dto);
	}

	@Get()
	findAll(@Query(ValidationPipe) query: FindAgendasQueryDto) {
		return this.agendaService.findAll(query);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.agendaService.findOne(id);
	}
}

