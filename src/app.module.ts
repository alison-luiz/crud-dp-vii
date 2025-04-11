import { Module } from '@nestjs/common'
import { DatabaseConfig } from './shared/database/database.config'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseService } from './shared/database/database.service'

import { CharacterModule } from './modules/character/character.module'
import { MagicItemModule } from './modules/magic-item/magic-item.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) =>
				DatabaseConfig.createTypeOrmOptions(configService),
			inject: [ConfigService]
		}),
		CharacterModule,
		MagicItemModule
	],
	controllers: [],
	providers: [DatabaseService]
})
export class AppModule {}
