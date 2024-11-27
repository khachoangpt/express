import { DatabaseType, NodeEnv, ProductType } from '@/constants/enums'
import { any, coerce, nativeEnum, number, object, string, type z } from 'zod'

// env
export const envSchema = object({
	NODE_ENV: nativeEnum(NodeEnv),
	PORT: coerce.number(),
	DB_CONNECTION: string(),
	DB_TYPE: nativeEnum(DatabaseType),
})

// register
const registerSchema = object({
	name: string(),
	email: string().email(),
	password: string().min(8).max(32),
})
type RegisterSchema = z.infer<typeof registerSchema>

// login
const loginSchema = object({
	email: string().email(),
	password: string().min(8).max(32),
})
type LoginSchema = z.infer<typeof loginSchema>

// refresh token
const refreshTokenSchema = object({
	refreshToken: string(),
})
type RefreshTokenSchema = z.infer<typeof refreshTokenSchema>

// logout
const logoutSchema = object({
	refreshToken: string(),
})
type LogoutSchema = z.infer<typeof logoutSchema>

// create product
const createProductSchema = object({
	name: string(),
	thumbnail: string(),
	description: string(),
	price: number(),
	quantity: number(),
	type: nativeEnum(ProductType),
	attributes: any(),
})
type CreateProductSchema = z.infer<typeof createProductSchema>

export type {
	RegisterSchema,
	LoginSchema,
	RefreshTokenSchema,
	LogoutSchema,
	CreateProductSchema,
}
export {
	registerSchema,
	loginSchema,
	refreshTokenSchema,
	logoutSchema,
	createProductSchema,
}
