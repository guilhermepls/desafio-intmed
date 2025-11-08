import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidade } from './especialidade.entity';
import { EspecialidadeService } from './especialidade.service';
import { EspecialidadesController } from './especialidade.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Especialidade])], 
	controllers: [EspecialidadesController], 
	providers: [EspecialidadeService], 
})
export class EspecialidadeModule {}