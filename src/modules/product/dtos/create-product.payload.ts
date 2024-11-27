import type { ProductStatus, ProductType } from '@/constants/enums'

/**
 * @swagger
 * components:
 *   schemas:
 *     AnyValue:
 *       description: 'Can be anything: string, number, array, object, etc., including `null`'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProductPayload:
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
 *         attributes:
 *           $ref: '#/components/schemas/AnyValue'
 *         ratingAverage:
 *           type: number
 *         slug:
 *           type: string
 *         variants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AnyValue'
 *         status:
 *           $ref: '#/components/schemas/ProductStatus'
 */
export class CreateProductPayload {
	name: string
	thumbnail: string
	description: string
	price: number
	quantity: number
	type: ProductType
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	attributes: any
	ratingAverage?: number
	slug?: string
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	variants?: any[]
	status?: ProductStatus
}
