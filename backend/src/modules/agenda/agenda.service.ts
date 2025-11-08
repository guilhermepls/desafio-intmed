import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Agenda } from "./agenda.entity";
import { CreateAgendaDto } from "./dto/create-agenda.dto";
import { Medico } from "../medico/medico.entity";

@Injectable()
export class AgendaService {
	constructor(
		@InjectRepository(Agenda)
		private agendaRepository: Repository<Agenda>,
		@InjectRepository(Medico)
		private medicoRepository: Repository<Medico>,
	) {}

	async create(dto: CreateAgendaDto): Promise<Agenda> {
		const medico = await this.medicoRepository.findOne({
			where: { id: dto.medicoId }
		});

		if (!medico) {
			throw new NotFoundException('Médico não encontrado');
		}

		const hoje = new Date();
		hoje.setHours(0, 0, 0, 0);
		const diaAgenda = new Date(dto.dia);

		if (diaAgenda < hoje) {
			throw new BadRequestException('Não pode criar agenda para data passada');
		}

		const agendaExistente = await this.agendaRepository.findOne({
			where: {
				medicoId: dto.medicoId,
				dia: dto.dia
			}
		});

		if (agendaExistente) {
			throw new ConflictException('Já existe uma agenda para este médico neste dia');
		}

		const agenda = this.agendaRepository.create(dto);
		return await this.agendaRepository.save(agenda);
	}

	async findAll(): Promise<Agenda[]> {
		return await this.agendaRepository.find({
			relations: ['medico'],
		});
	}

	async findOne(id: number): Promise<Agenda | null> {
		return await this.agendaRepository.findOne({
			where: { id },
			relations: ['medico'],
		});
	}
}

