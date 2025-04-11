import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CharacterClass } from '../enum/character-class.dto'
import { MagicItem } from '../../magic-item/entities/magic-item.entity'
import { Expose } from 'class-transformer'

@Entity('characters')
export class Character {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'varchar', length: 100, nullable: false })
	name: string

	@Column({
		name: 'adventurer_name',
		type: 'varchar',
		length: 100,
		nullable: false
	})
	adventurerName: string

	@Column({ type: 'enum', enum: CharacterClass, nullable: false })
	class: CharacterClass

	@Column({ type: 'int', nullable: false, default: 1 })
	level: number

	@Column({ type: 'int', nullable: false, default: 0 })
	strength: number

	@Column({ type: 'int', nullable: false, default: 0 })
	defense: number

	@OneToMany(() => MagicItem, (item) => item.character)
	magicItems: MagicItem[]

	@Expose()
	get totalStrength(): number {
		return (
			this.strength +
			(this.magicItems?.reduce((acc, item) => acc + item.strength, 0) || 0)
		)
	}

	@Expose()
	get totalDefense(): number {
		return (
			this.defense +
			(this.magicItems?.reduce((acc, item) => acc + item.defense, 0) || 0)
		)
	}
}
