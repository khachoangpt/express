import { OK } from '@/base/success.response'
import { refreshTokenSchema } from '@/configs/schema'
import { validator } from '@/utils/validator'
import type { Request, Response } from 'express'
import AuthService from '../auth.service'
import type { RefreshTokenPayload } from '../dtos/refresh-token.payload'

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenPayload'
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenResponse'
 */
export default async (req: Request, res: Response) => {
	const validated = await validator<RefreshTokenPayload>(
		refreshTokenSchema,
		req.body,
	)
	const authService: AuthService = req.scope.resolve(AuthService.resolutionKey)
	const response = await authService.refreshToken(validated)
	new OK(response).send(res)
}
