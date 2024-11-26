import type { Server } from 'node:http'
import { app } from '@/app'
import { appConfig } from '@/configs/app-config'
import { Logger } from '@/configs/logger'
import { NodeEnv } from '@/constants/enums'
import { loader } from '@/loaders'
import { validateEnv } from '@/utils/validate-env'

/**
 * Bootstraps the application, validates the environment variables,
 * generates the OpenAPI specification and starts the server.
 *
 * @async
 * @returns {Promise<void>} A Promise that resolves when the application
 * has finished bootstrapping.
 */
const bootstrap = async (): Promise<void> => {
	const { valid, errorMessage } = await validateEnv()
	const logger = new Logger('App')

	if (!valid) {
		logger.error(errorMessage)
		process.exit(1)
	}

	const { port } = appConfig
	await loader(app)

	if (appConfig.nodeEnv === NodeEnv.DEVELOPMENT) {
		const { generateOAS } = await import('@/utils/generate-oas')
		await generateOAS()
	}

	const server: Server = app.listen(port, () => {
		logger.info(`Server running on port ${port}`)
	})

	process.on('SIGINT', () => {
		if (!server.listening) return

		server.close(() => {
			logger.warn('Server stopped')
		})
	})
}

bootstrap()
