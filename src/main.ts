import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { AllExceptionsFilter } from './common/filters/all-exceptions/all-exceptions.filter'
import { RequestMethod, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)
	const generalConfig = configService.get('general')
	app.useGlobalFilters(new AllExceptionsFilter())

	// Set all routes to start with prefix of /api but health and statically served page.
	app.setGlobalPrefix('api', {
		exclude: [
			{ path: 'health', method: RequestMethod.GET },
			{ path: '/', method: RequestMethod.GET },
		],
	})
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(generalConfig.port)
}

bootstrap()
