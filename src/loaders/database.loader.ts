import { appConfig } from '@/configs/app-config'
import { Logger } from '@/configs/logger'
import { DatabaseType, NodeEnv } from '@/constants/enums'
import mongoose from 'mongoose'

type DatabaseLoaderType = {
	dbType: DatabaseType
}

export const loadDatabase = async ({
	dbType,
}: DatabaseLoaderType): Promise<void> => {
	const logger = new Logger('Loader')
	try {
		logger.info('Start database loader')

		switch (dbType) {
			case DatabaseType.MONGO:
				await connectMongoDB()
				break
			default:
				logger.error('Database type not found')
		}

		logger.info('Database loader success')
	} catch (error: unknown) {
		logger.error(JSON.stringify(error))
		process.exit(1)
	}
}

const connectMongoDB = async (): Promise<void> => {
	const { nodeEnv, dbConnection } = appConfig

	if (nodeEnv === NodeEnv.DEVELOPMENT) {
		mongoose.set('debug', true)
		mongoose.set('debug', { color: true })
	}

	await mongoose.connect(dbConnection)
}
