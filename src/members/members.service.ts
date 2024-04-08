import { Injectable } from '@nestjs/common'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Member } from './entities/member.entity'
import { Repository } from 'typeorm'
import { NoContentException } from '../common/exceptions/no-content.exception'

@Injectable()
export class MembersService {
	constructor(
		@InjectRepository(Member)
		private readonly memberRepository: Repository<Member>,
	) {
	}

	async create(dto: CreateMemberDto) {
		const member = new Member()
		Object.assign(member, dto)

		return await this.memberRepository.save(member)
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
}
