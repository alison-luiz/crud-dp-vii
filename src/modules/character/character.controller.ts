import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	Query,
	ClassSerializerInterceptor,
	UseInterceptors
} from '@nestjs/common'
import { CharacterService } from './services/character.service'
import { Character } from './entities/character.entity'
import { CreateCharacterService } from './services/create-character.service'
import { CreateCharacterDto } from './dto/create-character.dto'
import { UpdateCharacterService } from './services/update-character.service'
import { DeleteCharacterService } from './services/delete-character.service'
import { FindAllCharacterDto } from './dto/find-all-character.dto'
import { PaginationResponse } from '@/shared/helpers/pagination-template-query-builder.helper'
import { UpdateCharacterDto } from './dto/update-character.dto'
import { MagicItem } from '../magic-item/entities/magic-item.entity'

@Controller('characters')
@UseInterceptors(ClassSerializerInterceptor)
export class CharacterController {
	constructor(
		private readonly characterService: CharacterService,
		private readonly createCharacterService: CreateCharacterService,
		private readonly updateCharacterService: UpdateCharacterService,
		private readonly deleteCharacterService: DeleteCharacterService
	) {}

	@Post()
	async create(
		@Body() createCharacterDto: CreateCharacterDto
	): Promise<Character> {
		return this.createCharacterService.create(createCharacterDto)
	}

	@Get()
	async findAll(
		@Query() findAllCharacterDto: FindAllCharacterDto
	): Promise<PaginationResponse<Character>> {
		return this.characterService.findAll(findAllCharacterDto)
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Character> {
		return this.characterService.findOne(id)
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateCharacterDto: UpdateCharacterDto
	): Promise<Character> {
		return this.updateCharacterService.update(id, updateCharacterDto)
	}

	@Put(':id/adventurer-name')
	async updateAdventurerName(
		@Param('id') id: string,
		@Body('adventurerName') adventurerName: string
	): Promise<Character> {
		return this.updateCharacterService.updateAdventurerName(id, adventurerName)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<{ message: string }> {
		return this.deleteCharacterService.delete(id)
	}

	@Post(':id/add/:magicItemId')
	addToCharacter(
		@Param('id') id: string,
		@Param('magicItemId') magicItemId: string
	): Promise<{ message: string }> {
		return this.characterService.addMagicItemToCharacter(id, magicItemId)
	}

	@Delete(':id/remove/:magicItemId')
	removeFromCharacter(
		@Param('id') id: string,
		@Param('magicItemId') magicItemId: string
	): Promise<{ message: string }> {
		return this.characterService.removeMagicItemFromCharacter(id, magicItemId)
	}

	@Get(':id/amulet')
	findCharacterAmulet(
		@Param('id') id: string
	): Promise<MagicItem | { message: string }> {
		return this.characterService.findCharacterAmulet(id)
	}

	@Get(':id/magic-items')
	findAllMagicItems(
		@Param('id') id: string
	): Promise<MagicItem[] | { message: string }> {
		return this.characterService.findAllMagicItems(id)
	}
}
