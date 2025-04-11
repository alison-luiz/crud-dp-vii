import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MagicItem } from './entities/magic-item.entity'
import { MagicItemService } from './services/magic-item.service'
import { MagicItemController } from './magic-item.controller'
import { CreateMagicItemService } from './services/create-magic-item.service'
import { UpdateMagicItemService } from './services/update-magic-item.service'
import { DeleteMagicItemService } from './services/delete-magic-item.service'

@Module({
	imports: [TypeOrmModule.forFeature([MagicItem])],
	controllers: [MagicItemController],
	providers: [
		MagicItemService,
		CreateMagicItemService,
		UpdateMagicItemService,
		DeleteMagicItemService
	],
	exports: [MagicItemService]
})
export class MagicItemModule {}
