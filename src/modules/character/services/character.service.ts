import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Character } from '../entities/character.entity'
import { FindAllCharacterDto } from '../dto/find-all-character.dto'
import paginationTemplateQueryBuilderHelper, {
	PaginationResponse
} from '@/shared/helpers/pagination-template-query-builder.helper'
import { AppError } from '@/shared/utils/appError.exception'
import { MagicItemService } from '@/modules/magic-item/services/magic-item.service'
import { MagicItemType } from '@/modules/magic-item/enum/magic-item-type.enum'
import { MagicItem } from '@/modules/magic-item/entities/magic-item.entity'

@Injectable()
export class CharacterService {
	constructor(
		@InjectRepository(Character)
		private readonly characterRepository: Repository<Character>,
		private readonly magicItemService: MagicItemService
	) {}

	async findAll(
		findAllCharacterDto: FindAllCharacterDto
	): Promise<PaginationResponse<Character>> {
		const { page = 1, limit = 10 } = findAllCharacterDto

		const queryBuilder = this.characterRepository
			.createQueryBuilder('character')
			.leftJoinAndSelect('character.magicItems', 'magicItems')

		if (findAllCharacterDto.name) {
			queryBuilder.andWhere('character.name LIKE :name', {
				name: `%${findAllCharacterDto.name}%`
			})
		}

		if (findAllCharacterDto.adventurerName) {
			queryBuilder.andWhere('character.adventurerName LIKE :adventurerName', {
				adventurerName: `%${findAllCharacterDto.adventurerName}%`
			})
		}

		if (findAllCharacterDto.class) {
			queryBuilder.andWhere('character.class = :class', {
				class: findAllCharacterDto.class
			})
		}

		if (findAllCharacterDto.level) {
			queryBuilder.andWhere('character.level = :level', {
				level: findAllCharacterDto.level
			})
		}

		return paginationTemplateQueryBuilderHelper(queryBuilder, page, limit)
	}

	async findOne(id: string): Promise<Character> {
		const character = await this.characterRepository.findOne({
			where: { id },
			relations: ['magicItems']
		})

		if (!character) {
			throw new AppError({
				id: 'CHARACTER_NOT_FOUND',
				message: 'Character not found',
				status: HttpStatus.NOT_FOUND
			})
		}

		return character
	}

	async addMagicItemToCharacter(
		characterId: string,
		magicItemId: string
	): Promise<{ message: string }> {
		const character = await this.characterRepository.findOne({
			where: { id: characterId },
			relations: ['magicItems']
		})

		if (!character) {
			throw new AppError({
				id: 'CHARACTER_NOT_FOUND',
				message: 'Character not found',
				status: HttpStatus.NOT_FOUND
			})
		}

		const magicItem = await this.magicItemService.findOne(magicItemId)

		const hasItem = character.magicItems.some((item) => item.id === magicItemId)

		if (hasItem) {
			throw new AppError({
				id: 'CHARACTER_ALREADY_HAS_ITEM',
				message: 'Character already has this magic item',
				status: HttpStatus.BAD_REQUEST
			})
		}

		if (magicItem.type === MagicItemType.AMULET) {
			const hasAmulet = character.magicItems.some(
				(item) => item.type === MagicItemType.AMULET
			)

			if (hasAmulet) {
				throw new AppError({
					id: 'CHARACTER_ALREADY_HAS_AMULET',
					message: 'Character already has an amulet',
					status: HttpStatus.BAD_REQUEST
				})
			}
		}

		character.magicItems.push(magicItem)

		await this.characterRepository.save(character)

		return {
			message: `${magicItem.name} of type ${magicItem.type} has been added to ${character.name}`
		}
	}

	async removeMagicItemFromCharacter(
		characterId: string,
		magicItemId: string
	): Promise<{ message: string }> {
		const character = await this.findOne(characterId)

		const magicItem = await this.magicItemService.findOne(magicItemId)

		if (!character.magicItems.some((item) => item.id === magicItemId)) {
			throw new AppError({
				id: 'MAGIC_ITEM_NOT_FOUND',
				message: 'Magic item not found',
				status: HttpStatus.NOT_FOUND
			})
		}

		character.magicItems = character.magicItems.filter(
			(item) => item.id !== magicItemId
		)

		await this.characterRepository.save(character)

		return {
			message: `${magicItem.name} of type ${magicItem.type} has been removed from ${character.name}`
		}
	}

	async findCharacterAmulet(
		characterId: string
	): Promise<MagicItem | { message: string }> {
		const character = await this.findOne(characterId)

		const hasAmulet = character.magicItems.some(
			(item) => item.type === MagicItemType.AMULET
		)

		if (!hasAmulet) {
			return {
				message: 'Character does not have an amulet'
			}
		}

		return character.magicItems.find(
			(item) => item.type === MagicItemType.AMULET
		)
	}

	async findAllMagicItems(
		characterId: string
	): Promise<MagicItem[] | { message: string }> {
		const character = await this.findOne(characterId)

		if (character.magicItems.length === 0) {
			return {
				message: 'Character does not have any magic items'
			}
		}

		return character.magicItems
	}
}
