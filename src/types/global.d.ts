declare global {
	namespace Express {
		interface Request {
			scope: AwilixContainer
			userId: string
		}
	}

	namespace NodeJS {
		interface ProcessEnv {
			PORT: number
			DB_CONNECTION: string
			DB_TYPE: DatabaseType
			NODE_ENV: NodeEnv
		}
	}

	interface Error {
		status: number
	}
}

export {}
