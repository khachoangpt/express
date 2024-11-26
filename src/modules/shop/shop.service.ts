import type { ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose'
import { type Shop, shopModel } from './models/shop.model'

export default class ShopService {
	static resolutionKey = 'shopService'

	/**
	 * Find one shop by filter.
	 *
	 * @param {RootFilterQuery<Shop>} [filter] - Filter to find shop.
	 * @param {ProjectionType<Shop> | null} [projection] - Projection to select fields.
	 * @param {QueryOptions<Shop> | null} [options] - Query options.
	 *
	 * @returns {Promise<Shop | null>} Shop or null if not found.
	 */
	async findOne(
		filter?: RootFilterQuery<Shop>,
		projection?: ProjectionType<Shop> | null,
		options?: QueryOptions<Shop> | null,
	): Promise<Shop | null> {
		return await shopModel.findOne(filter, projection, options).lean()
	}

	/**
	 * Create a new shop.
	 *
	 * @param {Shop} payload - Data to create shop.
	 *
	 * @returns {Promise<Shop>} Created shop.
	 */
	async create(payload: Shop): Promise<Shop> {
		return await shopModel.create(payload)
	}
}
