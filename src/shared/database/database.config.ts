import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { Character } from '@/modules/character/entities/character.entity'
import { MagicItem } from '@/modules/magic-item/entities/magic-item.entity'

export class DatabaseConfig {
	static createTypeOrmOptions(
		configService: ConfigService
	): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			url: configService.get('DATABASE_URL'),
			ssl: false,
			useUTC: true,
			entities: [Character, MagicItem],
			synchronize: true,
			connectTimeoutMS: 30000,
			logging: false,
			migrationsRun: false,
			migrations: ['src/shared/database/migrations/*.ts']
		}
	}
}
