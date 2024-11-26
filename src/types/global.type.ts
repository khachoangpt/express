import type { DatabaseType, NodeEnv } from '@/constants/enums'

type AppConfig = {
	port: number
	dbType: DatabaseType
	dbConnection: string
	nodeEnv: NodeEnv
}

export type { AppConfig }
