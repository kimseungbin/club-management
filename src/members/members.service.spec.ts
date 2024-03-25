import { Test, TestingModule } from '@nestjs/testing'
import { MembersService } from './members.service'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Member } from './entities/member.entity'
import { HttpException } from '@nestjs/common'

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
	find: jest.fn(),
	findOne: jest.fn(),
	findOneBy: jest.fn(),
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

				await expect(service.findAll()).rejects.toThrow(HttpException)
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
})
