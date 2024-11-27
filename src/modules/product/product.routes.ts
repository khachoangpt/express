import { authentication } from '@/middlewares/authentication'
import { asyncHandler } from '@/utils/async-handler'
import { Router } from 'express'
import createProductController from './controllers/create-product.controller'

export default (app: Router): Router => {
	const router = Router()
	app.use('/product', router)

	/* Authentication */
	router.use(authentication)

	/* Create product */
	router.post('', asyncHandler(createProductController))

	return router
}
