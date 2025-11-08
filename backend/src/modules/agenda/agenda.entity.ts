import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Medico } from '../medico/medico.entity';

@Entity('agendas')
@Unique(['medicoId', 'dia'])
export class Agenda {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Medico)
	@JoinColumn({ name: 'medico_id' })
	medico: Medico;

	@Column({ name: 'medico_id' })
	medicoId: number;

	@Column({ type: 'date' })
	dia: string;

	@Column({ type: 'json' })
	horarios: string[];
}
