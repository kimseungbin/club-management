import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Member } from './entities/member.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MembersService {
	constructor(
		@InjectRepository(Member)
		private readonly memberRepository: Repository<Member>,
	) {
	}

	create(createMemberDto: CreateMemberDto) {
		return 'This action adds a new member'
	}

	async findAll() {
		const members = await this.memberRepository.find()

		if (members.length === 0) {
			throw new HttpException('No Content', HttpStatus.NO_CONTENT)
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
