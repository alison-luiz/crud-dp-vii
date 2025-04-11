import { QueryTemplateDto } from '@/shared/dtos/query-template.dto'
import { IsEnum, IsOptional } from 'class-validator'
import { IsNotEmpty } from 'class-validator'
import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { CharacterClass } from '../enum/character-class.dto'

export class FindAllCharacterDto extends QueryTemplateDto {
	@ApiProperty({
		description: 'Nome do personagem',
		example: 'Aragorn'
	})
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	name: string

	@ApiProperty({
		description: 'Nome aventureiro do personagem',
		example: 'Aragorn'
	})
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	adventurerName: string

	@ApiProperty({
		description: 'Classe do personagem',
		example: 'Guerreiro'
	})
	@IsEnum(CharacterClass)
	@IsOptional()
	@IsNotEmpty()
	class: CharacterClass

	@ApiProperty({
		description: 'Nível do personagem',
		example: 1
	})
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	level: string
}
