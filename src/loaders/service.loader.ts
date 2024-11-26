import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Logger } from '@/configs/logger'
import { type AwilixContainer, Lifetime, asClass } from 'awilix'

export const loadService = async (
	container: AwilixContainer,
): Promise<void> => {
	const logger = new Logger('Loader')

	const __filename = fileURLToPath(import.meta.url)
	const __dirname = path.dirname(__filename)

	container.loadModules(
		[
			[
				path.join(__dirname, '..', 'modules/**/*.service.{ts,js}'),
				{
					register: asClass,
					lifetime: Lifetime.SINGLETON,
				},
			],
		],
		{
			formatName: 'camelCase',
			resolverOptions: {
				lifetime: Lifetime.SINGLETON,
				register: asClass,
			},
		},
	)

	logger.info('Service loader success')
}
