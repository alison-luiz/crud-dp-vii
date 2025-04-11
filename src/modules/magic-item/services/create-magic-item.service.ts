import { Injectable, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MagicItem } from '../entities/magic-item.entity'
import { CreateMagicItemDto } from '../dto/create-magic-item.dto'
import { MagicItemType } from '../enum/magic-item-type.enum'
import { AppError } from '@/shared/utils/appError.exception'

@Injectable()
export class CreateMagicItemService {
	constructor(
		@InjectRepository(MagicItem)
		private readonly magicItemRepository: Repository<MagicItem>
	) {}

	async create(createMagicItemDto: CreateMagicItemDto): Promise<MagicItem> {
		const { type, strength, defense } = createMagicItemDto

		if (type === MagicItemType.WEAPON) {
			if (defense !== 0) {
				throw new AppError({
					id: 'INVALID_WEAPON_DEFENSE',
					message: 'Defense must be 0 for weapon type',
					status: HttpStatus.BAD_REQUEST
				})
			}

			if (strength > 10 || strength < 1) {
				throw new AppError({
					id: 'INVALID_WEAPON_STRENGTH',
					message: 'Strength must be between 1 and 10 for weapon type',
					status: HttpStatus.BAD_REQUEST
				})
			}
		}

		if (type === MagicItemType.ARMOR) {
			if (strength !== 0) {
				throw new AppError({
					id: 'INVALID_ARMOR_STRENGTH',
					message: 'Strength must be 0 for armor type',
					status: HttpStatus.BAD_REQUEST
				})
			}

			if (defense > 10 || defense < 1) {
				throw new AppError({
					id: 'INVALID_ARMOR_DEFENSE',
					message: 'Defense must be between 1 and 10 for armor type',
					status: HttpStatus.BAD_REQUEST
				})
			}
		}

		if (type === MagicItemType.AMULET) {
			if (strength > 10 || strength < 1) {
				throw new AppError({
					id: 'INVALID_AMULET_STRENGTH',
					message: 'Strength must be between 1 and 10 for amulet type',
					status: HttpStatus.BAD_REQUEST
				})
			}

			if (defense > 10 || defense < 1) {
				throw new AppError({
					id: 'INVALID_AMULET_DEFENSE',
					message: 'Defense must be between 1 and 10 for amulet type',
					status: HttpStatus.BAD_REQUEST
				})
			}
		}

		const newMagicItem = this.magicItemRepository.create(createMagicItemDto)
		return this.magicItemRepository.save(newMagicItem)
	}
}
