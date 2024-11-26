import { Timestamp } from '@/models/timestamp.model'
import { Schema, type Types, model } from 'mongoose'

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

/**
 * @swagger
 * components:
 *   schemas:
 *     Key:
 *       type: object
 *       required:
 *         - userId
 *         - publicKey
 *         - refreshToken
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *         userId:
 *           type: string
 *           format: ObjectId
 *         publicKey:
 *           type: string
 *         refreshToken:
 *           type: string
 *         isUsed:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
class Key extends Timestamp {
	constructor(partial: Partial<Key>) {
		super(partial)
		Object.assign(this, partial)
	}

	_id?: Types.ObjectId
	userId: Types.ObjectId
	publicKey: string
	refreshToken: string
	isUsed?: boolean
}

const keySchema = new Schema<Key>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Shop',
		},
		publicKey: {
			type: Schema.Types.String,
			required: true,
		},
		refreshToken: {
			type: Schema.Types.String,
			required: true,
		},
		isUsed: {
			type: Schema.Types.Boolean,
			default: false,
		},
	},
	{ timestamps: true, collection: COLLECTION_NAME },
)

const keyModel = model<Key>(DOCUMENT_NAME, keySchema)

export { keyModel, Key }
