import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from './agenda.entity';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { MedicoModule } from '../medico/medico.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Agenda]),
		MedicoModule,
	],
	controllers: [AgendaController],
	providers: [AgendaService],
	exports: [AgendaService],
})
export class AgendaModule {}