import { appConfig } from '@/configs/app-config'
import { NodeEnv } from '@/constants/enums'
import { statusCodes } from '@/constants/status-codes'
import { asyncHandler } from '@/utils/async-handler'
import { handleError } from '@/utils/handle-error'
import { type Express, type Request, type Response, Router } from 'express'
import swaggerUI from 'swagger-ui-express'
import authRoutes from '../auth/auth.routes'
import productRoutes from '../product/product.routes'
import healthController from './controllers/health.controller'

export default (app: Express): Router => {
	const router = Router()
	const { nodeEnv } = appConfig
	app.use('/api/v1', router)

	/* Health check */
	router.get('/health', asyncHandler(healthController))

	if (nodeEnv === NodeEnv.DEVELOPMENT) {
		import('../../../docs/swagger.json').then((swaggerDocument) => {
			/* Swagger UI */
			router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

			/* Swagger JSON */
			router.get('/docs.json', (_req: Request, res: Response) => {
				res.status(statusCodes.OK).send(swaggerDocument)
			})
		})
	}

	authRoutes(router)
	productRoutes(router)

	app.use(handleError)

	return router
}
