import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import databaseConfig from './config/database.config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import generalConfig from './config/general.config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingInterceptor } from './common/interceptors/logging/logging.interceptor'
import { MembersModule } from './members/members.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { HealthController } from './health/health.controller'


@Module({
	imports: [ConfigModule.forRoot({
		load: [generalConfig, databaseConfig],
	}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule.forFeature(generalConfig), ConfigModule.forFeature(databaseConfig), ServeStaticModule.forRoot({ rootPath: join(__dirname, 'client') })],
			inject: [generalConfig.KEY, databaseConfig.KEY],
			useFactory: async (generalConfiguration: ConfigType<typeof generalConfig>, databaseConfiguration: ConfigType<typeof databaseConfig>) => {
				const option: TypeOrmModuleOptions = {
					type: 'postgres',
					host: databaseConfiguration.host,
					port: databaseConfiguration.port,
					username: databaseConfiguration.username,
					password: databaseConfiguration.password,
					database: databaseConfiguration.database,
					entities: [__dirname + '/../**/*.entity.{js,ts}'],
					synchronize: true,
					namingStrategy: new SnakeNamingStrategy(),
				}

				const sslOption = {
					ssl: {
						rejectUnauthorized: false,
					},
				}
				if (generalConfiguration.stage === 'production') Object.assign(option, sslOption)

				return { ...option }
			},
		}),
		MembersModule],
	controllers: [HealthController],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
	],
})
export class AppModule {
}
