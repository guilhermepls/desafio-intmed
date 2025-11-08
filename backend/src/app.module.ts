import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EspecialidadeModule } from './especialidade/entities/especialidade.module';
import { MedicoModule } from './medico/medico.module';
@Module({
  imports: [
	ConfigModule.forRoot({ isGlobal: true,}),
	TypeOrmModule.forRootAsync({
		useClass: TypeOrmConfigService,
	}),
	EspecialidadeModule,
	MedicoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
