import { AllExceptionsFilter } from './all-exceptions.filter'
import { NoContentException } from '../../exceptions/no-content.exception'
import { ArgumentsHost } from '@nestjs/common'

describe('AllExceptionsFilter', () => {
	let filter: AllExceptionsFilter<Error>

	beforeEach(() => {
		filter = new AllExceptionsFilter()
	})

	describe('when instance of CustomErrorException is thrown', () => {
		it('should catch exception and return correct response', async () => {
			// Mock response argument
			const mockResponse = jest.fn()
			const mockStatus = jest.fn().mockImplementation(() => ({ send: mockResponse }))
			const res = ({
				status: mockStatus,
			} as unknown) as Response

			// Throw a generic exception
			const exception = new NoContentException('test')
			const host: ArgumentsHost = {
				switchToHttp: () => ({
					getResponse: () => res,
				}),
			} as unknown as ArgumentsHost

			filter.catch(exception, host)

			expect(mockStatus).toHaveBeenCalledWith(exception.desiredStatus)
			expect(mockResponse).toHaveBeenCalledWith(exception.message)
		})
	})
})
