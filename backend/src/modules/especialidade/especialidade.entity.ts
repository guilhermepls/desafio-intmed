import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Medico } from '../medico/medico.entity';  
@Entity('especialidades')
@Unique(['nome'])
export class Especialidade { 
	@PrimaryGeneratedColumn()
	id: number; 

	@Column({type: 'varchar', length: 100})
	nome: string; 

	@OneToMany(() => Medico, (medico) => medico.especialidade)
	medicos: Medico[]; 
}