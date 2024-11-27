import { BadRequest } from '@/base/error.response'
import { ProductType } from '@/constants/enums'
import type { Types } from 'mongoose'
import type { CreateProductPayload } from './dtos/create-product.payload'
import { Clothing } from './models/clothing.model'
import { Electronic } from './models/electronic.model'
import type { Product } from './models/product.model'

export default class ProductService {
	static resolutionKey = 'productService'

	async createProduct(
		shop_id: Types.ObjectId,
		payload: CreateProductPayload,
	): Promise<Product> {
		const type = payload.type

		switch (type) {
			case ProductType.CLOTHING:
				return await new Clothing({
					...payload,
					shop_id,
				}).createProduct()
			case ProductType.ELECTRONIC:
				return await new Electronic({ ...payload, shop_id }).createProduct()
			default:
				throw new BadRequest('Invalid product type')
		}
	}
}
