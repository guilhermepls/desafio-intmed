import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EspecialidadeModule } from './modules/especialidade/especialidade.module';
import { MedicoModule } from './modules/medico/medico.module';
import { AgendaModule } from './modules/agenda/agenda.module';
@Module({
  imports: [
	ConfigModule.forRoot({ isGlobal: true,}),
	TypeOrmModule.forRootAsync({
		useClass: TypeOrmConfigService,
	}),
	EspecialidadeModule,
	MedicoModule,
	AgendaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
