import { Injectable, HttpStatus } from '@nestjs/common'
import { Character } from '../entities/character.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCharacterDto } from '../dto/create-character.dto'
import { AppError } from '@/shared/utils/appError.exception'

@Injectable()
export class CreateCharacterService {
	constructor(
		@InjectRepository(Character)
		private readonly characterRepository: Repository<Character>
	) {}

	async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
		const { strength, defense, name, adventurerName } = createCharacterDto

		if (strength + defense > 10) {
			throw new AppError({
				id: 'INVALID_POINTS',
				message: 'The sum of strength and defense cannot exceed 10',
				status: HttpStatus.BAD_REQUEST
			})
		}

		const existingCharacterName = await this.characterRepository.findOne({
			where: [{ name }]
		})

		if (existingCharacterName) {
			throw new AppError({
				id: 'DUPLICATE_NAME',
				message: 'Character name already exists',
				status: HttpStatus.BAD_REQUEST
			})
		}

		const existingCharacterAdventurerName =
			await this.characterRepository.findOne({
				where: [{ adventurerName }]
			})

		if (existingCharacterAdventurerName) {
			throw new AppError({
				id: 'DUPLICATE_NAME',
				message: 'Adventurer name already exists',
				status: HttpStatus.BAD_REQUEST
			})
		}

		const newCharacter = this.characterRepository.create(createCharacterDto)
		return this.characterRepository.save(newCharacter)
	}
}
