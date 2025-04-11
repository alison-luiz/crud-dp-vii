import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { MagicItemType } from '../enum/magic-item-type.enum'
import { ApiProperty } from '@nestjs/swagger'

export class CreateMagicItemDto {
	@ApiProperty({
		description: 'Nome do item mágico',
		example: 'Espada do Rei'
	})
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({
		description: 'Tipo do item mágico',
		example: 'Arma'
	})
	@IsEnum(MagicItemType)
	@IsNotEmpty()
	type: MagicItemType

	@ApiProperty({
		description: 'Força do item mágico',
		example: 10
	})
	@IsNumber()
	@IsNotEmpty()
	strength: number

	@ApiProperty({
		description: 'Defesa do item mágico',
		example: 0
	})
	@IsNumber()
	@IsNotEmpty()
	defense: number
}
