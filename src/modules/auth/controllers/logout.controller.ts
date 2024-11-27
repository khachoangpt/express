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
 *     security:
 *       - bearerAuth: []
 *     description: Logout a shop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogoutPayload'
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
