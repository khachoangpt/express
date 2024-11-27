import { BadRequest } from '@/base/error.response'
import { Schema, type Types, model } from 'mongoose'
import { Product } from './product.model'

const DOCUMENT_NAME = 'Furniture'
const COLLECTION_NAME = 'Furnitures'

/**
 * @swagger
 * components:
 *   schemas:
 *     Furniture:
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
class Furniture extends Product {
	constructor(partial: Partial<Furniture>) {
		super(partial)
		Object.assign(this, partial)
	}

	brand: string
	size: string
	material: string
	declare shop_id: Types.ObjectId

	override async createProduct() {
		const newFurniture = await furnitureModel.create({
			...this.attributes,
			shop_id: this.shop_id,
		})
		if (!newFurniture) {
			throw new BadRequest('Failed to create furniture')
		}
		const newProduct = await super.createProduct(newFurniture._id)
		if (!newProduct) {
			throw new BadRequest('Failed to create product')
		}
		return newProduct
	}
}

const furnitureSchema = new Schema<Furniture>(
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

const furnitureModel = model<Furniture>(DOCUMENT_NAME, furnitureSchema)

export { furnitureModel, Furniture }
