import { OK } from '@/base/success.response'
import { loginSchema } from '@/configs/schema'
import { validator } from '@/utils/validator'
import type { Request, Response } from 'express'
import AuthService from '../auth.service'
import type { LoginPayload } from '../dtos/login.payload'

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a shop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginPayload'
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 */
export default async (req: Request, res: Response) => {
	const validated = await validator<LoginPayload>(loginSchema, req.body)
	const authService: AuthService = req.scope.resolve(AuthService.resolutionKey)
	const response = await authService.login(validated)
	new OK(response).send(res)
}
