import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MagicItem } from '../entities/magic-item.entity'
import { AppError } from '@/shared/utils/appError.exception'

@Injectable()
export class DeleteMagicItemService {
	constructor(
		@InjectRepository(MagicItem)
		private readonly magicItemRepository: Repository<MagicItem>
	) {}

	async delete(id: string): Promise<{ message: string }> {
		const magicItem = await this.magicItemRepository.findOne({
			where: { id },
			relations: ['character']
		})

		if (!magicItem) {
			throw new AppError({
				id: 'MAGIC_ITEM_NOT_FOUND',
				message: 'Magic item not found',
				status: HttpStatus.NOT_FOUND
			})
		}

		if (magicItem.character) {
			throw new AppError({
				id: 'MAGIC_ITEM_IN_USE',
				message: 'Magic item is in use',
				status: HttpStatus.BAD_REQUEST
			})
		}

		await this.magicItemRepository.delete(id)

		return {
			message: 'Magic item deleted successfully'
		}
	}
}
