import { HttpStatus, Injectable } from '@nestjs/common'
import { Character } from '../entities/character.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateCharacterDto } from '../dto/update-character.dto'
import { CharacterService } from './character.service'
import { AppError } from '@/shared/utils/appError.exception'

@Injectable()
export class UpdateCharacterService {
	constructor(
		@InjectRepository(Character)
		private readonly characterRepository: Repository<Character>,
		private readonly characterService: CharacterService
	) {}

	async update(
		id: string,
		updateCharacterDto: UpdateCharacterDto
	): Promise<Character> {
		const existingCharacter = await this.characterService.findOne(id)

		if (
			updateCharacterDto.strength !== undefined ||
			updateCharacterDto.defense !== undefined
		) {
			const newStrength =
				updateCharacterDto.strength ?? existingCharacter.strength
			const newDefense = updateCharacterDto.defense ?? existingCharacter.defense

			if (newStrength + newDefense > 10) {
				throw new AppError({
					id: 'CHARACTER_POINTS_ERROR',
					message: 'The sum of strength and defense cannot exceed 10',
					status: HttpStatus.BAD_REQUEST
				})
			}
		}

		if (updateCharacterDto.name) {
			const duplicateCharacterName = await this.characterRepository.findOne({
				where: [{ name: updateCharacterDto.name }]
			})

			if (duplicateCharacterName && duplicateCharacterName.id !== id) {
				throw new AppError({
					id: 'DUPLICATE_NAME',
					message: 'Character name or adventurer name already exists',
					status: HttpStatus.BAD_REQUEST
				})
			}
		}

		if (updateCharacterDto.adventurerName) {
			const duplicateCharacterAdventurerName =
				await this.characterRepository.findOne({
					where: [{ adventurerName: updateCharacterDto.adventurerName }]
				})

			if (
				duplicateCharacterAdventurerName &&
				duplicateCharacterAdventurerName.id !== id
			) {
				throw new AppError({
					id: 'DUPLICATE_NAME',
					message: 'Adventurer name already exists',
					status: HttpStatus.BAD_REQUEST
				})
			}
		}

		await this.characterRepository.update(id, updateCharacterDto)
		return this.characterService.findOne(id)
	}

	async updateAdventurerName(
		id: string,
		adventurerName: string
	): Promise<Character> {
		const duplicateCharacter = await this.characterRepository.findOne({
			where: { adventurerName }
		})

		if (duplicateCharacter && duplicateCharacter.id !== id) {
			throw new AppError({
				id: 'DUPLICATE_NAME',
				message: 'Adventurer name already exists',
				status: HttpStatus.BAD_REQUEST
			})
		}

		await this.characterRepository.update(id, { adventurerName })
		return this.characterService.findOne(id)
	}
}
