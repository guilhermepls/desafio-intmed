import { BadRequestException, ConflictException, Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consulta } from './consulta.entity';
import { MoreThan, Repository, Equal } from 'typeorm';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { AgendaService } from '../agenda/agenda.service';
import { In } from 'typeorm';
  
@Injectable()
export class ConsultaService {
	constructor(
	  @InjectRepository(Consulta)
	  private consultaRepository: Repository<Consulta>,
	  @Inject(forwardRef(() => AgendaService))
	  private agendaService: AgendaService,
	) {}

	private _formatConsultaResponse(consulta: Consulta) {
		if (!consulta.medico) {
		  return null;
		}
	
		return {
		  id: consulta.id,
		  dia: consulta.dia,
		  horario: consulta.horario,
		  data_agendamento: consulta.data_agendamento,
		  medico: {
			id: consulta.medico.id,
			crm: consulta.medico.crm,
			nome: consulta.medico.nome,
			email: consulta.medico.email,
		  },
		};
	  }
  
	async create(dto: CreateConsultaDto): Promise<any> {
	  const agenda = await this.agendaService.findOne(dto.agendaId);
  
	  const horarioFormatado = `${dto.horario}:00`;
	  if (!agenda.horarios.includes(horarioFormatado)) {
		throw new BadRequestException('Horário não disponível na agenda deste médico');
	  }
  
	  const agora = new Date();
	  const diaConsulta = new Date(`${agenda.dia}T${horarioFormatado}`);
  
	  if (diaConsulta < agora) {
		throw new BadRequestException('Não é possível marcar consultas em datas passadas');
	  }
  
	  const consultaExistente = await this.consultaRepository.findOne({
		where: {
		  agendaId: dto.agendaId,
		  horario: horarioFormatado,
		},
	  });
  
	  if (consultaExistente) {
		throw new ConflictException('Este horário já foi agendado');
	  }
  
	  const novaConsulta = this.consultaRepository.create({
		agendaId: dto.agendaId,
		horario: horarioFormatado,
		dia: agenda.dia,
		medicoId: agenda.medicoId, 
	  });
  
	  await this.consultaRepository.save(novaConsulta);
  
	  const consultaCompleta = await this.findOne(novaConsulta.id);
	  return this._formatConsultaResponse(consultaCompleta);	
	}
  
	async findAll(): Promise<any[]> {
	  const agora = new Date();
	  const horaAtual = agora.toTimeString().split(' ')[0];
	  const diaAtual = agora.toISOString().split('T')[0];
  
	  const consultas = await this.consultaRepository.find({
		relations: ['medico'], 
		where: [
		  { dia: MoreThan(diaAtual) },
		  { dia: Equal(diaAtual), horario: MoreThan(horaAtual) },
		],
		order: {
		  dia: 'ASC',
		  horario: 'ASC',
		},
	  });

	  return consultas.map(this._formatConsultaResponse);
	}
  
	async remove(id: number): Promise<void> {
	  const consulta = await this.findOne(id);
  
	  const agora = new Date();
	  const diaConsulta = new Date(`${consulta.dia}T${consulta.horario}`);
  
	  if (diaConsulta < agora) {
		throw new BadRequestException('Não é possível desmarcar uma consulta que já aconteceu');
	  }
  
	  await this.consultaRepository.remove(consulta);
	}

	async findOne(id: number): Promise<Consulta> {
	  const consulta = await this.consultaRepository.findOne({
		where: { id },
		relations: ['medico'], 
	  });
  
	  if (!consulta) {
		throw new NotFoundException(`Consulta com ID ${id} não encontrada`);
	  }
	  return consulta;
	}

	async findBookedSlotsByAgendaIds(
		agendaIds: number[],
	  ): Promise<Map<number, Set<string>>> {
		if (agendaIds.length === 0) {
		  return new Map();
		}
	
		const consultas = await this.consultaRepository.find({
		  where: {
			agendaId: In(agendaIds), 
		  },
		  select: ['agendaId', 'horario'], 
		});
	
		const bookedSlotsMap = new Map<number, Set<string>>();
		for (const consulta of consultas) {
		  let bookedSlots = bookedSlotsMap.get(consulta.agendaId);

		  if (!bookedSlots) {
			bookedSlots = new Set();
			bookedSlotsMap.set(consulta.agendaId, bookedSlots);
		  }
			bookedSlots.add(consulta.horario);
		}
	
		return bookedSlotsMap;
	  }
}