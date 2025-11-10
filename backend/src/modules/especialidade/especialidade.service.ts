import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from "typeorm";
import { Especialidade } from "./especialidade.entity";
import { CreateEspecialidadeDto } from "./dto/create-especialidade.dto";

@Injectable()
export class EspecialidadeService {
	constructor(
		@InjectRepository(Especialidade)
		private especialidadeRepository: 
	Repository<Especialidade>, 
	) {}

	async create(dto: CreateEspecialidadeDto): Promise<Especialidade> { 
		const especialidade = this.especialidadeRepository.create(dto); 

		try {
			return await this.especialidadeRepository.save(especialidade); 

		} catch (error) {
			if(error.code === '23505') {
			throw new ConflictException('Já existe uma especialidade com este nome');
			}
				throw error;
		}
	}

	async findAll(): Promise<Especialidade[]> { 
		return await this.especialidadeRepository.find(); 
	}
}