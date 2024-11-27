import { ProductStatus, ProductType } from '@/constants/enums'
import { BaseModel } from '@/models/base.model'
import { Schema, type Types, model } from 'mongoose'
import slugify from 'slugify'

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
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         attributes:
 *           $ref: '#/components/schemas/AnyValue'
 *         slug:
 *           type: string
 *         ratingAverage:
 *           type: number
 *         variants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AnyValue'
 *         status:
 *           $ref: '#/components/schemas/ProductStatus'
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
	slug: string
	ratingAverage: number
	variants: [Schema.Types.Mixed]
	status: ProductStatus

	async createProduct(id: Types.ObjectId) {
		this._id = id
		this.slug = this.slug ?? slugify(this.name, { lower: true, trim: true })
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
		slug: {
			type: Schema.Types.String,
			unique: true,
		},
		ratingAverage: {
			type: Schema.Types.Number,
			default: 5,
			min: [1, 'Rating must be above 1.0'],
			max: [5, 'Rating must be below 5.0'],
			set: (value: number) => Math.round(value * 10) / 10,
		},
		variants: {
			type: [Schema.Types.Mixed],
			default: [],
		},
		status: {
			type: Schema.Types.String,
			enum: [ProductStatus.DRAFT, ProductStatus.PUBLISHED],
			default: ProductStatus.DRAFT,
			index: true,
		},
	},
	{ timestamps: true, collection: COLLECTION_NAME },
)

const productModel = model<Product>(DOCUMENT_NAME, productSchema)

export { productModel, Product }
