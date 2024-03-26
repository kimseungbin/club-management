import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AbstractEntity } from '../../common/entities/abstract.entity'

@Entity('members')
export class Member extends AbstractEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string
}
