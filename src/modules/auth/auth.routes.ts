import { asyncHandler } from '@/utils/async-handler'
import { Router } from 'express'
import loginController from './controllers/login.controller'
import registerController from './controllers/register.controller'

export default (app: Router): Router => {
	const router = Router()
	app.use('/auth', router)

	/* Register */
	router.post('/register', asyncHandler(registerController))

	/* Login */
	router.post('/login', asyncHandler(loginController))

	return router
}
