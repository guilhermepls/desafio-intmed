import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from "typeorm";
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
			throw new ConflictException(`CRM já cadastrado`);
		}
		const medico = this.medicoRepository.create(dto);
		return await this.medicoRepository.save(medico);
	}

	async findAll(especialidadeId?: number): Promise<Medico[]> {
		const findOptions: FindManyOptions<Medico> = {
			relations: ['especialidade'],
			where: {},
			order: {nome: 'ASC'},
		}; 
		if(especialidadeId) {
			findOptions.where = {
				especialidadeId: especialidadeId,
			};
		}

		return await this.medicoRepository.find(findOptions)
	}

	async findOne(id: number): Promise<Medico> {
		const medico = await this.medicoRepository.findOne({
			where: { id },
			relations: ['especialidade'],
		});

		if(!medico){
			throw new NotFoundException(`Médico com ID ${id} não encontrado`); 
		}
		return medico; 
	}
}