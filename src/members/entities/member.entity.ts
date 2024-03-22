import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('members')
export class Member {
	@PrimaryGeneratedColumn('uuid')
	id: string
}
