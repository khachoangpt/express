import type { AppConfig } from '@/types/global.type'
import dotenv from 'dotenv'

dotenv.config()

export const appConfig: AppConfig = {
	port: process.env.PORT,
	dbConnection: process.env.DB_CONNECTION,
	nodeEnv: process.env.NODE_ENV,
	dbType: process.env.DB_TYPE,
}
