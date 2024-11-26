import { envSchema } from '@/configs/schema'
import { validator } from './validator'

/**
 * Validates the current environment variables against the schema
 * defined in `envSchema`. If the validation fails, it will return
 * an object with `valid` set to `false` and `errorMessage` with a
 * string containing the details of the error. If the validation
 * succeeds, it will return an object with `valid` set to `true` and
 * `errorMessage` set to `null`.
 *
 * @returns {Promise<{ valid: boolean, errorMessage: string | null }>}
 */
export const validateEnv = async (): Promise<{
	valid: boolean
	errorMessage: string | null
}> => {
	try {
		await validator(envSchema, process.env)
		return { valid: true, errorMessage: null }
	} catch (error) {
		const messages: { path: string; message: string }[] = JSON.parse(
			(error as Error).message,
		)
		return {
			valid: false,
			errorMessage: `Your environment variables are invalid\n${messages.map((e) => `${e.path}: ${e.message}\n`)}`,
		}
	}
}
