import { reasonPhrases } from '@/constants/reason-phrases'
import { statusCodes } from '@/constants/status-codes'
import type { NextFunction, Request, Response } from 'express'

/**
 * Express error-handling middleware function that formats and sends error responses.
 *
 * @param {Error} error - The error object containing details of the error encountered.
 * @param {Request} _req - The Express request object (unused).
 * @param {Response} res - The Express response object used to send the error response.
 * @param {NextFunction} next - The next middleware function in the stack.
 *
 * @returns {void} Sends a JSON response with the error status code and message.
 */
export const handleError = (
	error: Error,
	_req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const statusCode = error.status ?? statusCodes.INTERNAL_SERVER_ERROR

	res.status(statusCode).json({
		status: 'error',
		code: statusCode,
		message: error.message || reasonPhrases.INTERNAL_SERVER_ERROR,
	})
	next()
}
