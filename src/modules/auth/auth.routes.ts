import { asyncHandler } from '@/utils/async-handler'
import { Router } from 'express'
import registerController from './controllers/register.controller'

export default (app: Router): Router => {
	const router = Router()
	app.use('/auth', router)

	/* Register */
	router.post('/register', asyncHandler(registerController))

	return router
}
