import { Test, TestingModule } from '@nestjs/testing'
import { HealthController } from './health.controller'
import { HttpStatus } from '@nestjs/common'
import { Response } from 'express'

jest.mock('express')

describe('HealthController', () => {
	let controller: HealthController

	const mockResponse = {
		status: jest.fn().mockReturnThis(),
		send: jest.fn(),
	} as unknown as Response

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [HealthController],
		}).compile()

		controller = module.get<HealthController>(HealthController)
	})

	it('should define the health check method', () => {
		expect(controller.check).toBeDefined()
	})

	it('should return correct status code and message', () => {
		controller.check(mockResponse)
		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK)
		expect(mockResponse.send).toHaveBeenCalledWith('OK!')
	})
})
