import type { Shop } from '@/modules/shop/models/shop.model'

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         shop:
 *           $ref: '#/components/schemas/Shop'
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 */
export class RegisterResponse {
	shop: Shop
	accessToken: string
	refreshToken: string
}
