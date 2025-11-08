import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EspecialidadeModule } from './especialidade/entities/especialidade.module';
@Module({
  imports: [
	ConfigModule.forRoot({ isGlobal: true,}),
	TypeOrmModule.forRootAsync({
		useClass: TypeOrmConfigService,
	}),
	EspecialidadeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
