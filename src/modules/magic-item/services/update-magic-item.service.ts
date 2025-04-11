import { Injectable } from '@nestjs/common'
import { MagicItemService } from './magic-item.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MagicItem } from '../entities/magic-item.entity'
import { UpdateMagicItemDto } from '../dto/update-magic-item.dto'

@Injectable()
export class UpdateMagicItemService {
	constructor(
		@InjectRepository(MagicItem)
		private readonly magicItemRepository: Repository<MagicItem>,
		private readonly magicItemService: MagicItemService
	) {}

	async update(
		id: string,
		updateMagicItemDto: UpdateMagicItemDto
	): Promise<MagicItem> {
		const magicItem = await this.magicItemService.findOne(id)

		return this.magicItemRepository.save({
			...magicItem,
			...updateMagicItemDto
		})
	}
}
