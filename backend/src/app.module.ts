import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EspecialidadeModule } from './modules/especialidade/especialidade.module';
import { MedicoModule } from './modules/medico/medico.module';
import { AgendaModule } from './modules/agenda/agenda.module';
import { ConsultaModule } from './modules/consulta/consulta.module';
@Module({
  imports: [
	ConfigModule.forRoot({ isGlobal: true,}),
	TypeOrmModule.forRootAsync({
		useClass: TypeOrmConfigService,
	}),
	EspecialidadeModule,
	MedicoModule,
	AgendaModule,
	ConsultaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
