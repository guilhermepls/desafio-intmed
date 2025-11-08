import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from './agenda.entity';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { Medico } from '../medico/medico.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Agenda, Medico])],
	controllers: [AgendaController],
	providers: [AgendaService],
	exports: [AgendaService],
})
export class AgendaModule {}

