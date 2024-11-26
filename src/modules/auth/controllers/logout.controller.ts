import { OK } from '@/base/success.response'
import { logoutSchema } from '@/configs/schema'
import { validator } from '@/utils/validator'
import type { Request, Response } from 'express'
import AuthService from '../auth.service'
import type { LogoutPayload } from '../dtos/logout.payload'

export default async (req: Request, res: Response) => {
	const validated = await validator<LogoutPayload>(logoutSchema, req.body)
	const authService: AuthService = req.scope.resolve(AuthService.resolutionKey)
	await authService.logout(validated.refreshToken)
	new OK('Logout successfully').send(res)
}
