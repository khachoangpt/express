import { asyncHandler } from '@/utils/async-handler'
import { Router } from 'express'
import loginController from './controllers/login.controller'
import refreshTokenController from './controllers/refresh-token.controller'
import registerController from './controllers/register.controller'

export default (app: Router): Router => {
	const router = Router()
	app.use('/auth', router)

	/* Register */
	router.post('/register', asyncHandler(registerController))

	/* Login */
	router.post('/login', asyncHandler(loginController))

	/* Refresh token */
	router.post('/refresh-token', asyncHandler(refreshTokenController))

	return router
}
