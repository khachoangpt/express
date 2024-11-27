import { BadRequest } from '@/base/error.response'
import { Schema, type Types, model } from 'mongoose'
import { Product } from './product.model'

const DOCUMENT_NAME = 'Electronic'
const COLLECTION_NAME = 'Electronics'

/**
 * @swagger
 * components:
 *   schemas:
 *     Electronic:
 *       type: object
 *       required:
 *         - manufacturer
 *         - model
 *         - color
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *         manufacturer:
 *           type: string
 *         model:
 *           type: string
 *         color:
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
class Electronic extends Product {
	constructor(partial: Partial<Electronic>) {
		super(partial)
		Object.assign(this, partial)
	}

	manufacturer: string
	model: string
	color: string
	declare shop_id: Types.ObjectId

	override async createProduct() {
		const newElectronic = await electronicModel.create({
			...this.attributes,
			shop_id: this.shop_id,
		})
		if (!newElectronic) {
			throw new BadRequest('Failed to create electronic')
		}
		const newProduct = await super.createProduct()
		if (!newProduct) {
			throw new BadRequest('Failed to create product')
		}
		return newProduct
	}
}

const electronicSchema = new Schema<Electronic>(
	{
		manufacturer: {
			type: Schema.Types.String,
			trim: true,
			required: true,
		},
		model: {
			type: Schema.Types.String,
			trim: true,
			required: true,
		},
		color: {
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

const electronicModel = model<Electronic>(DOCUMENT_NAME, electronicSchema)

export { electronicModel, Electronic }
