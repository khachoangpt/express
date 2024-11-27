import type { ProductType } from '@/constants/enums'
import type { Types } from 'mongoose'
import type { CreateProductPayload } from './dtos/create-product.payload'
import type { Product } from './models/product.model'
import productRegistration from './product-registration'

export default class ProductService {
	static resolutionKey = 'productService'
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	static productRegistry: Record<ProductType, any> | any = {}

	constructor() {
		for (const [productType, Class] of Object.entries(productRegistration)) {
			ProductService.productRegistry[productType] = Class
		}
	}

	/**
	 * Creates a new product of the specified type and associates it with a shop.
	 *
	 * This method retrieves the appropriate class for the product type from the
	 * registry, initializes it with the provided payload and shop ID, and invokes
	 * its createProduct method.
	 *
	 * @param {Types.ObjectId} shop_id - The ID of the shop to associate with the product.
	 * @param {CreateProductPayload} payload - The data to create the product.
	 *
	 * @returns {Promise<Product>} The created product.
	 */
	async createProduct(
		shop_id: Types.ObjectId,
		payload: CreateProductPayload,
	): Promise<Product> {
		const type = payload.type
		const ProductClass = ProductService.productRegistry[type]
		return new ProductClass({ ...payload, shop_id }).createProduct(
			shop_id,
			payload,
		)
	}
}
