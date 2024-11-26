import { Logger } from '@/configs/logger'
import appRoutes from '@/modules/app/app.routes'
import type { Express } from 'express'

/**
 * Asynchronously loads the application's routes into the provided
 * Express app instance and logs the success of the operation.
 *
 * @param app - The express application instance where routes will be mounted
 * @returns A promise that resolves when the routes have been successfully loaded
 */
export const loadRoute = async (app: Express): Promise<void> => {
	const logger = new Logger('Loader')
	app.use(appRoutes(app))
	logger.info('Route loader success')
}
