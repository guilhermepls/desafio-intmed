import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Medico } from "./entities/medico.entity";
import { CreateMedicoDto } from "./entities/dto/create-medico.dto";

@Injectable()
export class MedicoService {
	constructor(
		@InjectRepository(Medico)
		private medicoRepository: Repository<Medico>,
	) {}

	async create(dto: CreateMedicoDto): Promise<Medico> {
		const medico = this.medicoRepository.create(dto);
		return await this.medicoRepository.save(medico);
	}

	async findAll(): Promise<Medico[]> {
		return await this.medicoRepository.find({
			relations: ['especialidade'],
		});
	}

	async findOne(id: number): Promise<Medico | null> {
		return await this.medicoRepository.findOne({
			where: { id },
			relations: ['especialidade'],
		});
	}
}

