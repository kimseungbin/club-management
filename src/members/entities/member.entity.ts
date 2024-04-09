import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AbstractEntity } from '../../common/entities/abstract.entity'
import { Matches } from 'class-validator'

@Entity('members')
export class Member extends AbstractEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	@Matches(/^010(\d{7,8})$/)
	phone: string
}
