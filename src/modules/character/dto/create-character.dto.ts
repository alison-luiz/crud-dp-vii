import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { CharacterClass } from '../enum/character-class.dto'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCharacterDto {
	@ApiProperty({
		description: 'Nome do personagem',
		example: 'Aragorn'
	})
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({
		description: 'Nome do aventureiro',
		example: 'Aragorn'
	})
	@IsString()
	@IsNotEmpty()
	adventurerName: string

	@ApiProperty({
		description: 'Classe do personagem',
		example: 'Guerreiro'
	})
	@IsEnum(CharacterClass)
	@IsNotEmpty()
	class: CharacterClass

	@ApiProperty({
		description: 'Força do personagem',
		example: 6
	})
	@IsNumber()
	@IsNotEmpty()
	strength: number

	@ApiProperty({
		description: 'Defesa do personagem',
		example: 4
	})
	@IsNumber()
	@IsNotEmpty()
	defense: number
}
