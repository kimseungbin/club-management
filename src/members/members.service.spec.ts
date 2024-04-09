import { Test, TestingModule } from '@nestjs/testing'
import { MembersService } from './members.service'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Member } from './entities/member.entity'
import { NoContentException } from '../common/exceptions/no-content.exception'
import { CreateMemberDto } from './dto/create-member.dto'
import { DuplicateItemException } from '../common/exceptions/duplicate-item.exception'

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
	find: jest.fn(),
	findOne: jest.fn(),
	findOneBy: jest.fn(),
	create: jest.fn(),
	save: jest.fn(),
	update: jest.fn(),
})

describe('MembersService', () => {
	let service: MembersService
	let memberRepository: MockRepository

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MembersService,
				{
					provide: getRepositoryToken(Member),
					useValue: createMockRepository(),
				},
			],
		}).compile()

		service = module.get<MembersService>(MembersService)
		memberRepository = module.get<MockRepository>(getRepositoryToken(Member))
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	describe('findAll', () => {
		describe('when there is no record in members table', () => {
			it('should throw HttpException 204', async () => {
				const want = []
				memberRepository.find.mockResolvedValue(want)

				await expect(service.findAll()).rejects.toThrow(NoContentException)
			})
		})
		describe('otherwise', () => {
			it('should return the array of members', async () => {
				const want = Array.from({ length: 10 }, () => new Member())
				memberRepository.find.mockReturnValue(want)

				const got = await service.findAll()
				expect(got).toEqual(want)
			})
		})
	})

	describe('create', () => {
		describe('when duplicate member exists', () => {
			describe('when using Postgres', () => {
				it('should throw a DuplicateMemberException', async () => {
					const mockMemberDto = new CreateMemberDto()

					const duplicateError: any = new Error()

					duplicateError.code = '23505'
					jest.spyOn(memberRepository, 'save').mockRejectedValueOnce(duplicateError)

					await expect(service.create(mockMemberDto)).rejects.toThrow(DuplicateItemException)
				})
			})
		})
		describe('otherwise', () => {
			it('should create a new member', async () => {
				const mockMemberDto = new CreateMemberDto()
				const want = new Member()

				jest.spyOn(memberRepository, 'save').mockResolvedValue(want)

				const got = await service.create(mockMemberDto)
				expect(got).toEqual(want)
			})
		})
	})
})
