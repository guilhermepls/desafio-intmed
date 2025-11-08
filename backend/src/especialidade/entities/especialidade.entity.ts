import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; 

@Entity('especialidades')
export class Especialidade { 
	@PrimaryGeneratedColumn()
	id: number; 

	@Column({type: 'varchar', length: 100})
	nome: string; 
}