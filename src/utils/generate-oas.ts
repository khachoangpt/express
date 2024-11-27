import fs from 'node:fs'
import { Logger } from '@/configs/logger'
import type { Options } from 'swagger-jsdoc'
import swaggerJSDoc from 'swagger-jsdoc'
import { validateOAS } from './validate-oas'

const options: Options = {
	definition: {
		openapi: '3.0.1',
		info: {
			title: 'API documentation',
			version: '1.0.0',
			description: 'API documentation',
			license: {
				name: 'MIT',
				url: 'https://choosealicense.com/licenses/mit/',
			},
			contact: {
				email: 'hoangncd3@gmail.com',
				name: 'Hoang Nguyen',
				url: 'https://github.com/khachoangpt',
			},
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		servers: [
			{
				url: 'http://localhost:8000/api/v1',
				description: 'Local server',
			},
		],
	},
	apis: ['./src/modules/**/*.ts', './src/constants/*.ts', './src/base/*.ts'],
}

/**
 * Generates OpenAPI Specification (OAS) for the API.
 *
 * This function uses swagger-jsdoc to generate the OAS based on the
 * OpenAPI specification options. It then validates the OAS using the
 * validateOAS function and writes it to a file.
 *
 * @returns {Promise<void>} A Promise that resolves when the OAS has been
 * exported.
 */
export const generateOAS = async (): Promise<void> => {
	const logger = new Logger('Swagger')
	logger.info('🟣 Generating OAS')
	const openapiSpecification = swaggerJSDoc(options)
	await validateOAS(openapiSpecification)

	fs.writeFileSync(
		'./docs/swagger.json',
		JSON.stringify(openapiSpecification, null, 2),
	)
	logger.info('⚫️ Exported Admin OAS')
}
