import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Especialidade } from "src/especialidade/entities/especialidade.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Especialidade],
  synchronize: process.env.NODE_ENV === "production",
  logging: process.env.NODE_ENV === "development",
};