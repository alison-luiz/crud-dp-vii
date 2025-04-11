import { HttpStatus, Injectable } from '@nestjs/common'
import { Character } from '../entities/character.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CharacterService } from './character.service'
import { AppError } from '@/shared/utils/appError.exception'

@Injectable()
export class DeleteCharacterService {
	constructor(
		@InjectRepository(Character)
		private readonly characterRepository: Repository<Character>,
		private readonly characterService: CharacterService
	) {}

	async delete(id: string): Promise<{ message: string }> {
		const character = await this.characterService.findOne(id)

		if (character.magicItems.length > 0) {
			throw new AppError({
				id: 'CHARACTER_HAS_MAGIC_ITEMS',
				message: 'Character has magic items',
				status: HttpStatus.BAD_REQUEST
			})
		}

		await this.characterRepository.delete(id)

		return {
			message: 'Character deleted successfully'
		}
	}
}
