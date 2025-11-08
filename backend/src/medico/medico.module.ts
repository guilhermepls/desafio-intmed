import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Medico])],
	controllers: [MedicoController],
	providers: [MedicoService],
})
export class MedicoModule {}

