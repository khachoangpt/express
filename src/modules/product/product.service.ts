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
