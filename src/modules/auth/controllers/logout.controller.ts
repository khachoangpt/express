import { OK } from '@/base/success.response'
import { logoutSchema } from '@/configs/schema'
import { validator } from '@/utils/validator'
import type { Request, Response } from 'express'
import AuthService from '../auth.service'
import type { LogoutPayload } from '../dtos/logout.payload'

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout a shop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogoutPayload'
 *     responses:
 *       200:
 *         description: Logout successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Logout successfully
 */
export default async (req: Request, res: Response) => {
	const validated = await validator<LogoutPayload>(logoutSchema, req.body)
	const authService: AuthService = req.scope.resolve(AuthService.resolutionKey)
	await authService.logout(validated.refreshToken)
	new OK('Logout successfully').send(res)
}
