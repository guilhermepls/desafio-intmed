import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, ValidationPipe, HttpCode} from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
  
@Controller('consultas')
export class ConsultaController {
	constructor(private readonly consultaService: ConsultaService) {}
  
	@Post()
	create(@Body(ValidationPipe) createConsultaDto: CreateConsultaDto) {
	  return this.consultaService.create(createConsultaDto);
	}
  
	@Get()
	findAll() {
	  return this.consultaService.findAll();
	}
  
	@Delete(':id')
	@HttpCode(204) 
	remove(@Param('id', ParseIntPipe) id: number) {
	  return this.consultaService.remove(id);
	}
}