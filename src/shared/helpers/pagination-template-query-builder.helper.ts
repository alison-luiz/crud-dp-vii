import { SelectQueryBuilder } from 'typeorm'

export type PaginationMeta = {
	current_page: number
	from: number
	last_page: number
	per_page: number
	to: number
	total: number
}

export type PaginationResponse<T> = {
	data: T[]
	meta: PaginationMeta
}

export default async function paginationTemplateQueryBuilderHelper<T>(
	queryBuilder: SelectQueryBuilder<T>,
	page: number,
	limit: number
): Promise<PaginationResponse<T>> {
	const [data, count] = await queryBuilder
		.skip((+page - 1) * +limit)
		.take(+limit)
		.getManyAndCount()

	const totalPages = Math.ceil(count / +limit)

	const from = (+page - 1) * +limit + 1
	const to = (+page - 1) * +limit + data.length

	return {
		data: data,
		meta: {
			current_page: +page,
			from: from > count ? count : from,
			last_page: totalPages,
			per_page: +limit,
			to: to > count ? count : to,
			total: count
		}
	}
}
