import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigType } from '@nestjs/config'
import databaseConfig from './config/database.config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import generalConfig from './config/general.config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingInterceptor } from './common/interceptors/logging/logging.interceptor'
import { MembersService } from './members/members.service'
import { MembersController } from './members/members.controller'
import { MembersModule } from './members/members.module'

@Module({
	imports: [ConfigModule.forRoot({
		load: [generalConfig, databaseConfig],
	}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule.forFeature(generalConfig), ConfigModule.forFeature(databaseConfig)],
			inject: [generalConfig.KEY, databaseConfig.KEY],
			useFactory: async (generalConfiguration: ConfigType<typeof generalConfig>, databaseConfiguration: ConfigType<typeof databaseConfig>) => {
				const option: TypeOrmModuleOptions = {
					type: 'postgres',
					host: databaseConfiguration.host,
					port: databaseConfiguration.port,
					username: databaseConfiguration.username,
					password: databaseConfiguration.password,
					database: databaseConfiguration.database,
					entities: ['dist/**/*.entity.js'],
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
	controllers: [AppController, MembersController],
	providers: [AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
		MembersService],
})
export class AppModule {
}
