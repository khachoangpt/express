import type {
	DeleteResult,
	MongooseUpdateQueryOptions,
	ProjectionType,
	QueryOptions,
	RootFilterQuery,
	Types,
	UpdateQuery,
	UpdateResult,
	UpdateWithAggregationPipeline,
} from 'mongoose'
import { type Key, keyModel } from './models/key.model'

export default class KeyService {
	static resolutionKey = 'keyService'

	/**
	 * Creates a new key pair.
	 *
	 * @param {Partial<Key>} payload - Data to create key pair.
	 * @returns {Promise<Key>} Created key pair.
	 */
	async create(payload: Partial<Key>): Promise<Key> {
		return await keyModel.create(payload)
	}

	/**
	 * Finds a key by refresh token.
	 *
	 * This method retrieves a key document from the database using the provided refresh token.
	 * Optionally, it allows specifying a projection to select fields and query options.
	 *
	 * @param {string} refreshToken - The refresh token of the key pair to find.
	 * @param {ProjectionType<Key> | null} [projection] - Fields to include or exclude from the document.
	 * @param {QueryOptions<Key> | null} [options] - Additional query options.
	 *
	 * @returns {Promise<Key | null>} The key pair document if found, otherwise null.
	 */
	async findByRefreshToken(
		refreshToken: string,
		projection?: ProjectionType<Key> | null,
		options?: QueryOptions<Key> | null,
	): Promise<Key | null> {
		return await keyModel.findOne({ refreshToken }, projection, options).lean()
	}

	/**
	 * Deletes all key associated with the given user ID.
	 *
	 * @param {Types.ObjectId} userId - The ID of the user to delete key for.
	 *
	 * @returns {Promise<DeleteResult>} Resolves when the operation is complete.
	 */
	async deleteByUserId(userId: Types.ObjectId): Promise<DeleteResult> {
		return await keyModel.deleteMany({ userId }).lean()
	}

	/**
	 * Updates a single key document.
	 *
	 * This method updates a single key document matching the filter.
	 * Optionally, it allows specifying a projection to select fields and query options.
	 *
	 * @param {RootFilterQuery<Key> | null} [filter] - Filter to select the document to update.
	 * @param {UpdateQuery<Key> | UpdateWithAggregationPipeline | null} [update] - The update operations to apply.
	 * @param {MongooseUpdateQueryOptions<Key> | null} [options] - Additional query options.
	 *
	 * @returns {Promise<UpdateResult>} Resolves when the operation is complete.
	 */
	async updateOne(
		filter?: RootFilterQuery<Key>,
		update?: UpdateQuery<Key> | UpdateWithAggregationPipeline,
		options?: MongooseUpdateQueryOptions<Key> | null,
	): Promise<UpdateResult> {
		return await keyModel.updateOne(filter, update, options)
	}

	/**
	 * Finds all keys associated with the given user ID.
	 *
	 * @param {Types.ObjectId} userId - The ID of the user to find key for.
	 * @param {ProjectionType<Key> | null} [projection] - Fields to include or exclude from the documents.
	 * @param {QueryOptions<Key> | null} [options] - Additional query options.
	 *
	 * @returns {Promise<Key[]>} Resolves with an array of key documents if found, otherwise an empty array.
	 */
	async findByUserId(
		userId: Types.ObjectId,
		projection?: ProjectionType<Key> | null,
		options?: QueryOptions<Key> | null,
	): Promise<Key[]> {
		return await keyModel.find({ userId }, projection, options).lean()
	}

	/**
	 * Deletes a single key associated with the given refresh token.
	 *
	 * @param {string} refreshToken - The refresh token of the key to delete.
	 *
	 * @returns {Promise<DeleteResult>} Resolves when the operation is complete.
	 */
	async deleteByRefreshToken(refreshToken: string): Promise<DeleteResult> {
		return await keyModel.deleteOne({ refreshToken }).lean()
	}
}
