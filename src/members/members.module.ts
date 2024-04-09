import { Module } from '@nestjs/common'
import { MembersService } from './members.service'
import { MembersController } from './members.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Member } from './entities/member.entity'
import databaseConfig from '../configs/database.config'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		TypeOrmModule.forFeature([Member]),
		ConfigModule.forFeature(databaseConfig),
	],
	controllers: [MembersController],
	providers: [MembersService],
})
export class MembersModule {
}
