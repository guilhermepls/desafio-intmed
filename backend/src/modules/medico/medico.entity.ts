import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique} from 'typeorm'; 
import { Especialidade } from '../especialidade/especialidade.entity'; 

@Entity('medicos')
@Unique(['crm'])
export class Medico { 
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	nome: string; 

	@Column({ unique: true})
	crm: number; 

	@Column({ nullable: true})
	email: string;

	@ManyToOne(() => Especialidade)
	@JoinColumn({ name: 'especialidade_id'})
	especialidade: Especialidade; 

	@Column({ name: 'especialidade_id'})
	especialidadeId: number;
}