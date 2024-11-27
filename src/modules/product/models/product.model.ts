import { ProductType } from '@/constants/enums'
import { BaseModel } from '@/models/base.model'
import { Schema, type Types, model } from 'mongoose'

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - thumbnail
 *         - description
 *         - price
 *         - quantity
 *         - type
 *         - shop_id
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *         name:
 *           type: string
 *         thumbnail:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         quantity:
 *           type: number
 *         type:
 *           $ref: '#/components/schemas/ProductType'
 *         shop_id:
 *           type: string
 *           format: ObjectId
 */
class Product extends BaseModel {
	constructor(partial: Partial<Product>) {
		super(partial)
		Object.assign(this, partial)
	}

	name: string
	thumbnail: string
	description: string
	price: number
	quantity: number
	type: ProductType
	shop_id: Types.ObjectId
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	attributes: any

	async createProduct() {
		return await productModel.create(this)
	}
}

const productSchema = new Schema<Product>(
	{
		name: {
			type: Schema.Types.String,
			trim: true,
			required: true,
		},
		thumbnail: {
			type: Schema.Types.String,
			trim: true,
			required: true,
		},
		description: {
			type: Schema.Types.String,
			trim: true,
			required: true,
		},
		price: {
			type: Schema.Types.Number,
			required: true,
		},
		quantity: {
			type: Schema.Types.Number,
			required: true,
		},
		type: {
			type: Schema.Types.String,
			enum: [
				ProductType.CLOTHING,
				ProductType.ELECTRONIC,
				ProductType.FURNITURE,
			],
			required: true,
		},
		shop_id: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Shop',
		},
		attributes: {
			type: Schema.Types.Mixed,
		},
	},
	{ timestamps: true, collection: COLLECTION_NAME },
)

const productModel = model<Product>(DOCUMENT_NAME, productSchema)

export { productModel, Product }
