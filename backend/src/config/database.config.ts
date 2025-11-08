import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Especialidade } from "src/especialidade/entities/especialidade.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.configService.get<string>("DATABASE_HOST"),
      port: this.configService.get<number>("DATABASE_PORT", 5432),
      username: this.configService.get<string>("DATABASE_USER"),
      password: this.configService.get<string>("DATABASE_PASSWORD") || "",
      database: this.configService.get<string>("DATABASE_NAME"),
      entities: [Especialidade],
      synchronize: this.configService.get<string>("NODE_ENV") !== "production",
      logging: this.configService.get<string>("NODE_ENV") === "development",
    };
  }
}