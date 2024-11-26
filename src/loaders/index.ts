import { DatabaseType } from '@/constants/enums'
import { createContainer } from 'awilix'
import type { Express, NextFunction, Request, Response } from 'express'
import { loadDatabase } from './database.loader'
import { loadRoute } from './route.loader'
import { loadService } from './service.loader'

/**
 * A loader that creates a request scope for the dependency injection container.
 *
 * @param app - The express app instance
 * @returns A promise that resolves when the loader has finished
 */
const loader = async (app: Express): Promise<void> => {
	const container = createContainer()

	// Add the registered services to the request scope
	app.use((req: Request, _res: Response, next: NextFunction) => {
		req.scope = container.createScope()
		next()
	})

	await loadRoute(app)
	await loadService(container)
	await loadDatabase({ dbType: DatabaseType.MONGO })
}

export { loader }
