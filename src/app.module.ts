import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigType } from '@nestjs/config'
import databaseConfig from './config/database.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Module({
	imports: [ConfigModule.forRoot({
		load: [databaseConfig],
	}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule.forFeature(databaseConfig)],
			inject: [databaseConfig.KEY],
			useFactory: async (databaseConfiguration: ConfigType<typeof databaseConfig>) => ({
				type: 'postgres',
				host: databaseConfiguration.host,
				port: databaseConfiguration.port,
				username: databaseConfiguration.username,
				password: databaseConfiguration.password,
				database: databaseConfiguration.database,
				entities: ['dist/**/*.entity.js'],
				synchronize: true,
				namingStrategy: new SnakeNamingStrategy(),
			}),
		})],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
