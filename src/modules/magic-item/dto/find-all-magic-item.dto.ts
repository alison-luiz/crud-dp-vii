import { QueryTemplateDto } from '@/shared/dtos/query-template.dto'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { MagicItemType } from '../enum/magic-item-type.enum'

export class FindAllMagicItemDto extends QueryTemplateDto {
	@ApiProperty({
		description: 'Nome do item mágico',
		example: 'Espada do Rei'
	})
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	name: string

	@ApiProperty({
		description: 'Tipo do item mágico',
		example: 'Arma'
	})
	@IsEnum(MagicItemType)
	@IsOptional()
	@IsNotEmpty()
	type: MagicItemType
}
