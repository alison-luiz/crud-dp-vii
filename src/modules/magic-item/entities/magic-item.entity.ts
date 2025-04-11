import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Character } from '../../character/entities/character.entity'
import { MagicItemType } from '../enum/magic-item-type.enum'

@Entity('magic_items')
export class MagicItem {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'varchar', length: 100, nullable: false })
	name: string

	@Column({
		type: 'enum',
		enum: MagicItemType,
		nullable: false
	})
	type: MagicItemType

	@Column({ type: 'int', nullable: false, default: 0 })
	strength: number

	@Column({ type: 'int', nullable: false, default: 0 })
	defense: number

	@ManyToOne(() => Character, (character) => character.magicItems, {
		eager: true
	})
	character: Character
}
