import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common'
import { CustomErrorException } from '../../exceptions/custom-error.exception'
import { Response } from 'express'

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionsFilter.name)

	catch(exception: T, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const res = ctx.getResponse<Response>()
		if (exception instanceof CustomErrorException) {
			if (exception.desiredStatus) {
				if (exception.desiredStatus > 400) {
					this.logger.warn(exception.message)
					return res.status(exception.desiredStatus).send(exception.message)
				}
				this.logger.debug(exception.message)
				return res.status(exception.desiredStatus).send(exception.message)
			}
		}
		this.logger.error(exception)
		return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(exception)
	}
}
