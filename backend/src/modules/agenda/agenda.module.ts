import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agenda } from './agenda.entity';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { MedicoModule } from '../medico/medico.module';
import { ConsultaModule } from '../consulta/consulta.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Agenda]),
		MedicoModule,
		forwardRef(() => ConsultaModule),
	],
	controllers: [AgendaController],
	providers: [AgendaService],
	exports: [AgendaService],
})
export class AgendaModule {}