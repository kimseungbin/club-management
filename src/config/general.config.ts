import { registerAs } from '@nestjs/config'

export default registerAs('general', () => ({
	port: process.env.PORT || 3000,
	stage: process.env.STAGE || 'production',
}))
