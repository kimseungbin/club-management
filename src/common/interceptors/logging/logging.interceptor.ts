import { CallHandler, ExecutionContext, Inject, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { ConfigType } from '@nestjs/config'
import generalConfig from '../../../configs/general.config'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

	private readonly logger = new Logger(LoggingInterceptor.name)

	constructor(@Inject(generalConfig.KEY) private readonly generalConfiguration: ConfigType<typeof generalConfig>) {
	}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		// In production environment, CloudWatch adds timestamp of its own.
		const date = this.generalConfiguration.stage === 'production' ? '' : new Date()

		const req = context.switchToHttp().getRequest()

		this.logger.log(`Received ${req.method} ${req.url} ${date}`)

		const now = Date.now()

		return next.handle().pipe(tap(res => {
			this.logger.log(`Response for ${req.method} ${req.url} ${date}: `, res)
			const diff = Date.now() - now
			this.logger.log(`Request took ${diff}ms`)
		}))
	}
}
