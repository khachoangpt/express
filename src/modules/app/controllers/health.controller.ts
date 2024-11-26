import { OK } from '@/base/success.response'
import type { Request, Response } from 'express'

/**
 * @swagger
 * /health:
 *   get:
 *     description: Health check
 *     operationId: checkHealth
 *     tags:
 *       - App
 *     summary: Health check
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: OK
 */
export default async (_req: Request, res: Response) => {
	new OK('OK').send(res)
}
