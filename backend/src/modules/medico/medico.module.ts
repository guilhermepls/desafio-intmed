import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './medico.entity';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Medico])],
	controllers: [MedicoController],
	providers: [MedicoService],
	exports: [MedicoService],
})
export class MedicoModule {}