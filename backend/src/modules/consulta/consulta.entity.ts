import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique, } from 'typeorm';
import { Agenda } from '../agenda/agenda.entity';
import { Medico } from '../medico/medico.entity';
  
@Entity('consultas')
@Unique(['agendaId', 'horario']) 
export class Consulta {
	@PrimaryGeneratedColumn()
	id: number;
  
	@Column({ type: 'date' })
	dia: string;
  
	@Column({ type: 'time' })
	horario: string;

	@CreateDateColumn({ name: 'data_agendamento' })
	data_agendamento: Date;
  
	@Column({ name: 'agenda_id' })
	agendaId: number;
  
	@ManyToOne(() => Agenda)
	@JoinColumn({ name: 'agenda_id' })
	agenda: Agenda;
  
	@Column({ name: 'medico_id' })
	medicoId: number;
  
	@ManyToOne(() => Medico)
	@JoinColumn({ name: 'medico_id' })
	medico: Medico;
}