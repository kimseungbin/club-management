import { Controller, Get, Inject } from '@nestjs/common'
import generalConfig from './general.config'
import { ConfigType } from '@nestjs/config'

@Controller('configs')
export class ConfigsController {
	constructor(
		@Inject(generalConfig.KEY) private readonly generalConfiguration: ConfigType<typeof generalConfig>,
	) {
	}

	@Get('cognito-client-id')
	getCognitoClientId() {
		return this.generalConfiguration.cognitoClientId
	}
}
