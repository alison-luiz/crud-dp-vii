import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateMagicItemDto {
	@ApiProperty({
		description: 'Nome do item mágico',
		example: 'Espada do Rei'
	})
	@IsString()
	@IsNotEmpty()
	name: string
}
