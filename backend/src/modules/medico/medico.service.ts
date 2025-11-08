import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Medico } from "./medico.entity";
import { CreateMedicoDto } from "./dto/create-medico.dto";

@Injectable()
export class MedicoService {
	constructor(
		@InjectRepository(Medico)
		private medicoRepository: Repository<Medico>,
	) {}

	async create(dto: CreateMedicoDto): Promise<Medico> {
		const medicoExistente = await this.medicoRepository.findOne({
			where: { crm: dto.crm }
		}); 
		if (medicoExistente) { 
			throw new ConflictException('CRM já cadastrado');
		}
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