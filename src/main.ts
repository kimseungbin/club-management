import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { AllExceptionsFilter } from './common/filters/all-exceptions/all-exceptions.filter'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)
	const generalConfig = configService.get('general')
	app.useGlobalFilters(new AllExceptionsFilter())
	await app.listen(generalConfig.port)
}
bootstrap()
