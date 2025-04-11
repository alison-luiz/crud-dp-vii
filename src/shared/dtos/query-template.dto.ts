import { Type } from 'class-transformer'
import { IsNumber, IsOptional, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class QueryTemplateDto {
	@ApiProperty({
		description: 'Número da página',
		example: 1
	})
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	@Min(1)
	page: number

	@ApiProperty({
		description: 'Número de itens por página',
		example: 10
	})
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	@Min(1)
	limit: number
}
