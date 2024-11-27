import { BadRequest } from '@/base/error.response'
import { Schema, type Types, model } from 'mongoose'
import { Product } from './product.model'

const DOCUMENT_NAME = 'Clothing'
const COLLECTION_NAME = 'Clothes'

/**
 * @swagger
 * components:
 *   schemas:
 *     Clothing:
 *       type: object
 *       required:
 *         - brand
 *         - size
 *         - material
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *         brand:
 *           type: string
 *         size:
 *           type: string
 *         material:
 *           type: string
 *         shop_id:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
class Clothing extends Product {
	constructor(partial: Partial<Clothing>) {
		super(partial)
		Object.assign(this, partial)
	}

	brand: string
	size: string
	material: string
	declare shop_id: Types.ObjectId

	override async createProduct() {
		const newClothing = await clothingModel.create({
			...this.attributes,
			shop_id: this.shop_id,
		})
		if (!newClothing) {
			throw new BadRequest('Failed to create clothing')
		}
		const newProduct = await super.createProduct(newClothing._id)
		if (!newProduct) {
			throw new BadRequest('Failed to create product')
		}
		return newProduct
	}
}

const clothingSchema = new Schema<Clothing>(
	{
		brand: {
			type: Schema.Types.String,
			trim: true,
			required: true,
		},
		size: {
			type: Schema.Types.String,
			trim: true,
			required: true,
		},
		material: {
			type: Schema.Types.String,
			trim: true,
			required: true,
		},
		shop_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Shop',
		},
	},
	{ timestamps: true, collection: COLLECTION_NAME },
)

const clothingModel = model<Clothing>(DOCUMENT_NAME, clothingSchema)

export { clothingModel, Clothing }
