import { Created } from '@/base/success.response'
import { createProductSchema } from '@/configs/schema'
import { validator } from '@/utils/validator'
import type { Request, Response } from 'express'
import { Types } from 'mongoose'
import type { CreateProductPayload } from '../dtos/create-product.payload'
import ProductService from '../product.service'

/**
 * @swagger
 * /product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create a new product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-client-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Shop id
 *       - in: header
 *         name: x-refresh-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductPayload'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
export default async (req: Request, res: Response) => {
	const shopId = new Types.ObjectId(req.userId)
	const validated = await validator<CreateProductPayload>(
		createProductSchema,
		req.body,
	)
	const productService: ProductService = req.scope.resolve(
		ProductService.resolutionKey,
	)
	const response = await productService.createProduct(shopId, validated)
	new Created(response).send(res)
}
