import { BadRequest } from '@/base/error.response'
import { z } from 'zod'

/**
 * Validate the given request body with the given schema.
 * @throws {BadRequest}
 * @returns The validated and parsed data.
 */
export const validator = async <T>(
	schema:
		| z.AnyZodObject
		| z.ZodOptional<z.AnyZodObject>
		| z.ZodEffects<z.AnyZodObject>,
	requestBody: unknown,
): Promise<T> => {
	try {
		const parseData = (await schema.parseAsync(requestBody)) as T
		return parseData
	} catch (error) {
		let res = error
		if (error instanceof z.ZodError) {
			res = error.issues.map((e) => ({ path: e.path[0], message: e.message }))
		}
		throw new BadRequest(JSON.stringify(res))
	}
}
