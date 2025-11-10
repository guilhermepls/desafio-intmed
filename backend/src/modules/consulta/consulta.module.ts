import { Module, forwardRef } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './consulta.entity';
import { AgendaModule } from '../agenda/agenda.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Consulta]),
    forwardRef(() => AgendaModule),
  ],
  controllers: [ConsultaController],
  providers: [ConsultaService],
  exports: [ConsultaService],
})
export class ConsultaModule {}