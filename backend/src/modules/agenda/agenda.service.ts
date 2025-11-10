import { BadRequestException, ConflictException, Injectable, NotFoundException, forwardRef, Inject } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Agenda } from "./agenda.entity";
import { CreateAgendaDto } from "./dto/create-agenda.dto";
import { MedicoService } from "../medico/medico.service";
import { ConsultaService } from '../consulta/consulta.service';
import { FindAgendasQueryDto } from './dto/find-agendas-query.dto'; 

@Injectable()
export class AgendaService {
	constructor(
		@InjectRepository(Agenda)
		private agendaRepository: Repository<Agenda>,
		private medicoService: MedicoService,
		@Inject(forwardRef(() => ConsultaService))
        private consultaService: ConsultaService,

	) {}

	private _formatAgendaResponse(agenda: Agenda) {
		if (!agenda.medico) {
		  return null;
		}
		const horariosFormatados = agenda.horarios.map((horario) =>
		  horario.substring(0, 5),
		);

		return {
			id: agenda.id,
			medico: {
			  id: agenda.medico.id,
			  crm: agenda.medico.crm,
			  nome: agenda.medico.nome,
			  email: agenda.medico.email,
			},
			dia: agenda.dia,
			horarios: horariosFormatados,
		  };
		}
	

	async create(dto: CreateAgendaDto): Promise<Agenda> {
		const medico = await this.medicoService.findOne(dto.medicoId);
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

	async findAll(query: FindAgendasQueryDto): Promise<any[]> {
		const { medico, crm, data_inicio, data_final } = query

		const queryBuilder = this.agendaRepository.createQueryBuilder('agenda'); 

		queryBuilder.leftJoinAndSelect('agenda.medico', 'medico'); 

		if (medico?.length) {
			queryBuilder.andWhere('medico.id IN (:...medico)', { medico }); 
		}
		if (crm?.length) { 
			queryBuilder.andWhere('medico.crm IN (:...crm)', { crm }); 
		}

		const hoje = new Date().toISOString().split('T')[0];
		queryBuilder.andWhere('agenda.dia >= :data_inicio', {
			data_inicio: data_inicio || hoje,
		});
		if (data_final) {
			queryBuilder.andWhere('agenda.dia <= :data_final', { data_final });
		}

		queryBuilder.orderBy('agenda.dia', 'ASC');

		const agendas = await queryBuilder.getMany();
    	if (agendas.length === 0) {
      	return []; 
    	}

		const agendaIds = agendas.map((a) => a.id);
    	const bookedSlotsMap =
      	await this.consultaService.findBookedSlotsByAgendaIds(agendaIds);

    	const agora = new Date();
    	const agendasDisponiveis: Agenda[] = [];

    	for (const agenda of agendas) {
      	const bookedSlots = bookedSlotsMap.get(agenda.id) || new Set();

      	const horariosDisponiveis = agenda.horarios.filter((horario) => {
        const diaHorario = new Date(`${agenda.dia}T${horario}`);

        const horarioPassou = diaHorario < agora;
        const horarioPreenchido = bookedSlots.has(horario);

        return !horarioPassou && !horarioPreenchido;
      	});

      	if (horariosDisponiveis.length > 0) {
        	agenda.horarios = horariosDisponiveis;
        	agendasDisponiveis.push(agenda);
      	}
    }
    	return agendasDisponiveis.map(this._formatAgendaResponse);
		
	}

	async findOne(id: number): Promise<Agenda> {
		const agenda = await this.agendaRepository.findOne({
			where: { id },
			relations: ['medico'],
		});

		if(!agenda) {
			throw new NotFoundException(`Agenda com ID ${id} não encontrada`);
		}
		return agenda;
	}
}