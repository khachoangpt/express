import { Logger } from '@/configs/logger'
import OpenAPIParser from '@readme/openapi-parser'

/**
 * Validates the given OpenAPI Specification (OAS) object.
 *
 * This function uses the OpenAPIParser to validate the provided OAS object.
 * If the validation is successful, it logs a success message and returns true.
 * If the validation fails, it logs an error message and returns false.
 *
 * @param oas - The OpenAPI Specification object to validate.
 * @returns A Promise that resolves to a boolean indicating
 * whether the OAS is valid or not.
 */
export const validateOAS = async (oas: object | string): Promise<boolean> => {
	const logger = new Logger('Swagger')
	try {
		await OpenAPIParser.validate(JSON.parse(JSON.stringify(oas)))
		logger.info('🟢 Valid OAS')
		return true
	} catch (err) {
		logger.error(`🔴 Invalid  OAS :: ${JSON.stringify(err)}`)
		return false
	}
}
