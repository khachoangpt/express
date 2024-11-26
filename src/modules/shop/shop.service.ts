import type { ProjectionType, QueryOptions } from 'mongoose'
import { type Shop, shopModel } from './models/shop.model'

export default class ShopService {
	static resolutionKey = 'shopService'

	/**
	 * Finds a shop by email.
	 *
	 * This method retrieves a shop document from the database using the provided email.
	 * Optionally, it allows specifying a projection to select fields and query options.
	 *
	 * @param {string} email - The email of the shop to find.
	 * @param {ProjectionType<Shop> | null} [projection] - Fields to include or exclude from the document.
	 * @param {QueryOptions<Shop> | null} [options] - Additional query options.
	 *
	 * @returns {Promise<Shop | null>} The shop document if found, otherwise null.
	 */
	async findByEmail(
		email: string,
		projection?: ProjectionType<Shop> | null,
		options?: QueryOptions<Shop> | null,
	): Promise<Shop | null> {
		return await shopModel.findOne({ email }, projection, options).lean()
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
