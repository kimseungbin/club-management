import { registerAs } from '@nestjs/config'
import * as process from 'process'

export default registerAs('database', () => ({
	type: process.env.DB_TYPE || 'postgres',
	host: process.env.DB_HOST || 'database',
	port: +process.env.DB_PORT || 5432,
	database: process.env.DB_NAME || 'postgres',
	username: process.env.DB_USERNAME || 'postgres',
	password: process.env.DB_PASSWORD || 'postgres',

}))
