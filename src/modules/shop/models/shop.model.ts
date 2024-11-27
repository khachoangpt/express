import { ShopStatus } from '@/constants/enums'
import { BaseModel } from '@/models/base.model'
import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

/**
 * @swagger
 * components:
 *   schemas:
 *     Shop:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         status:
 *           type: string
 *           enum: [ShopStatus.ACTIVE, ShopStatus.INACTIVE]
 *         verify:
 *           type: boolean
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         name: Shop Name
 *         email: test@example.com
 *         password: password123
 *         status: ACTIVE
 *         verify: true
 *         roles:
 *           - SHOP
 */
class Shop extends BaseModel {
	constructor(partial: Partial<Shop>) {
		super(partial)
		Object.assign(this, partial)
	}

	name: string

	email: string

	password: string

	status?: ShopStatus

	verify?: boolean

	roles?: string[]
}

const shopSchema = new Schema<Shop>(
	{
		name: {
			type: Schema.Types.String,
			trim: true,
			maxLength: 150,
		},
		email: {
			type: Schema.Types.String,
			unique: true,
			trim: true,
		},
		password: {
			type: Schema.Types.String,
			trim: true,
			required: true,
		},
		status: {
			type: Schema.Types.String,
			enum: [ShopStatus.ACTIVE, ShopStatus.INACTIVE],
			default: ShopStatus.INACTIVE,
		},
		verify: {
			type: Schema.Types.Boolean,
			default: false,
		},
		roles: {
			type: [Schema.Types.String],
			default: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const shopModel = model<Shop>(DOCUMENT_NAME, shopSchema)

export { Shop, shopModel }
