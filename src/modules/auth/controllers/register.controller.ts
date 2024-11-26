import { OK } from '@/base/success.response'
import { registerSchema } from '@/configs/schema'
import { validator } from '@/utils/validator'
import type { Request, Response } from 'express'
import AuthService from '../auth.service'
import type { RegisterPayload } from '../dtos/register.payload'

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new shop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterPayload'
 *     responses:
 *       200:
 *         description: Shop registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 */
export default async (req: Request, res: Response) => {
	const authService: AuthService = req.scope.resolve(AuthService.resolutionKey)
	const validated = await validator<RegisterPayload>(registerSchema, req.body)
	const response = await authService.register(validated)
	new OK(response).send(res)
}
