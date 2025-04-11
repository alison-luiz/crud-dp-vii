import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CharacterController } from './character.controller'
import { CharacterService } from './services/character.service'
import { Character } from './entities/character.entity'
import { MagicItemModule } from '@/modules/magic-item/magic-item.module'
import { CreateCharacterService } from './services/create-character.service'
import { UpdateCharacterService } from './services/update-character.service'
import { DeleteCharacterService } from './services/delete-character.service'
import { HttpModule } from '@nestjs/axios'

@Module({
	imports: [TypeOrmModule.forFeature([Character]), HttpModule, MagicItemModule],
	controllers: [CharacterController],
	providers: [
		CharacterService,
		CreateCharacterService,
		UpdateCharacterService,
		DeleteCharacterService
	],
	exports: [CharacterService]
})
export class CharacterModule {}
