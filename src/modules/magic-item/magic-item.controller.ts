import {
	Controller,
	Get,
	Post,
	Body,
	Query,
	Param,
	Put,
	Delete
} from '@nestjs/common'
import { MagicItemService } from './services/magic-item.service'
import { MagicItem } from './entities/magic-item.entity'
import { CreateMagicItemDto } from './dto/create-magic-item.dto'
import { CreateMagicItemService } from './services/create-magic-item.service'
import { FindAllMagicItemDto } from './dto/find-all-magic-item.dto'
import { PaginationResponse } from '@/shared/helpers/pagination-template-query-builder.helper'
import { UpdateMagicItemService } from './services/update-magic-item.service'
import { UpdateMagicItemDto } from './dto/update-magic-item.dto'
import { DeleteMagicItemService } from './services/delete-magic-item.service'

@Controller('magic-items')
export class MagicItemController {
	constructor(
		private readonly magicItemService: MagicItemService,
		private readonly createMagicItemService: CreateMagicItemService,
		private readonly updateMagicItemService: UpdateMagicItemService,
		private readonly deleteMagicItemService: DeleteMagicItemService
	) {}

	@Post()
	async create(
		@Body() createMagicItemDto: CreateMagicItemDto
	): Promise<MagicItem> {
		return this.createMagicItemService.create(createMagicItemDto)
	}

	@Get()
	async findAll(
		@Query() findAllMagicItemDto: FindAllMagicItemDto
	): Promise<PaginationResponse<MagicItem>> {
		return this.magicItemService.findAll(findAllMagicItemDto)
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<MagicItem> {
		return this.magicItemService.findOne(id)
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updateMagicItemDto: UpdateMagicItemDto
	): Promise<MagicItem> {
		return this.updateMagicItemService.update(id, updateMagicItemDto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string): Promise<{ message: string }> {
		return this.deleteMagicItemService.delete(id)
	}
}
