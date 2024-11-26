import { DatabaseType, NodeEnv } from '@/constants/enums'
import { coerce, nativeEnum, object, string, type z } from 'zod'

// env
export const envSchema = object({
	NODE_ENV: nativeEnum(NodeEnv),
	PORT: coerce.number(),
	DB_CONNECTION: string(),
	DB_TYPE: nativeEnum(DatabaseType),
})

const registerSchema = object({
	name: string(),
	email: string().email(),
	password: string().min(8).max(32),
})
type RegisterSchema = z.infer<typeof registerSchema>

export type { RegisterSchema }
export { registerSchema }
