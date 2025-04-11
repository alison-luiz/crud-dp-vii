import { Injectable, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MagicItem } from '../entities/magic-item.entity'
import { FindAllMagicItemDto } from '../dto/find-all-magic-item.dto'
import paginationTemplateQueryBuilderHelper, {
	PaginationResponse
} from '@/shared/helpers/pagination-template-query-builder.helper'
import { AppError } from '@/shared/utils/appError.exception'
@Injectable()
export class MagicItemService {
	constructor(
		@InjectRepository(MagicItem)
		private readonly magicItemRepository: Repository<MagicItem>
	) {}

	async findAll(
		findAllMagicItemDto: FindAllMagicItemDto
	): Promise<PaginationResponse<MagicItem>> {
		const { name, type, page = 1, limit = 10 } = findAllMagicItemDto

		const queryBuilder =
			this.magicItemRepository.createQueryBuilder('magic_item')

		if (name) {
			queryBuilder.andWhere('magic_item.name ILIKE :name', {
				name: `%${name}%`
			})
		}

		if (type) {
			queryBuilder.andWhere('magic_item.type = :type', { type })
		}

		return paginationTemplateQueryBuilderHelper(queryBuilder, page, limit)
	}

	async findOne(id: string): Promise<MagicItem> {
		const magicItem = await this.magicItemRepository.findOne({ where: { id } })

		if (!magicItem) {
			throw new AppError({
				id: 'MAGIC_ITEM_NOT_FOUND',
				message: 'Magic item not found',
				status: HttpStatus.NOT_FOUND
			})
		}

		return magicItem
	}
}
