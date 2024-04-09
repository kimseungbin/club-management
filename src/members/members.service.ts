import { Inject, Injectable } from '@nestjs/common'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Member } from './entities/member.entity'
import { Repository } from 'typeorm'
import { NoContentException } from '../common/exceptions/no-content.exception'
import { DuplicateItemException } from '../common/exceptions/duplicate-item.exception'
import databaseConfig from '../configs/database.config'
import { ConfigType } from '@nestjs/config'

interface DatabaseError extends Error {
	code?: string
	detail?: string
}

@Injectable()
export class MembersService {
	constructor(
		@Inject(databaseConfig.KEY)
		private readonly databaseConfiguration: ConfigType<typeof databaseConfig>,
		@InjectRepository(Member)
		private readonly memberRepository: Repository<Member>,
	) {
	}

	async create(dto: CreateMemberDto) {
		const member = this.memberRepository.create(dto)

		try {
			return await this.memberRepository.save(member)
		} catch (e) {
			console.dir(e)
			this.handleExceptions(e)
		}
	}

	async findAll() {
		const members = await this.memberRepository.find()

		if (members.length === 0) {
			throw new NoContentException(Member.name)
		}
		return members
	}

	findOne(id: number) {
		return `This action returns a #${id} member`
	}

	update(id: number, updateMemberDto: UpdateMemberDto) {
		return `This action updates a #${id} member`
	}

	remove(id: number) {
		return `This action removes a #${id} member`
	}

	private handleExceptions(error: DatabaseError) {
		if (this.databaseConfiguration.type === 'postgres') {
			console.log(error)
			// todo don't use magic string
			if (error.code === '23505') {
				const { duplicateField, value } = this.extractDuplicateFieldAndValue(error.detail)
				throw new DuplicateItemException(Member.name, duplicateField, value)
			}
			// Todo refactor using custom exception
			throw new Error(`An unexpected error occurred while using Postgres: ${error.message}`)
		}
		throw new Error('A database error occurred, and the error handling for the current DBMS type is not implemented yet')
	}

	private extractDuplicateFieldAndValue(message: string) {
		const re = /Key \((.+)\)=\((.+)\) already exists/
		const match = message.match(re)

		if (match) {
			return {
				duplicateField: match[1],
				value: match[2],
			}
		}

		// Todo refactor using custom exception
		throw new Error('Could not match the pattern')
	}
}
