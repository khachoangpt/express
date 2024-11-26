import { reasonPhrases } from '@/constants/reason-phrases'
import { statusCodes } from '@/constants/status-codes'

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         status:
 *           type: string
 *         code:
 *           type: number
 */
class ErrorResponse extends Error {
	constructor(message: string, status: number) {
		super(message)
		this.status = status
	}
}

class BadRequest extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.BAD_REQUEST,
		status: number = statusCodes.BAD_REQUEST,
	) {
		super(message, status)
	}
}

class Unauthorized extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.UNAUTHORIZED,
		status: number = statusCodes.UNAUTHORIZED,
	) {
		super(message, status)
	}
}

class Forbidden extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.FORBIDDEN,
		status: number = statusCodes.FORBIDDEN,
	) {
		super(message, status)
	}
}

class NotFound extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.NOT_FOUND,
		status: number = statusCodes.NOT_FOUND,
	) {
		super(message, status)
	}
}

class MethodNotAllowed extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.METHOD_NOT_ALLOWED,
		status: number = statusCodes.METHOD_NOT_ALLOWED,
	) {
		super(message, status)
	}
}

class NotAcceptable extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.NOT_ACCEPTABLE,
		status: number = statusCodes.NOT_ACCEPTABLE,
	) {
		super(message, status)
	}
}

class RequestTimeout extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.REQUEST_TIMEOUT,
		status: number = statusCodes.REQUEST_TIMEOUT,
	) {
		super(message, status)
	}
}

class Conflict extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.CONFLICT,
		status: number = statusCodes.CONFLICT,
	) {
		super(message, status)
	}
}

class TooManyRequests extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.TOO_MANY_REQUESTS,
		status: number = statusCodes.TOO_MANY_REQUESTS,
	) {
		super(message, status)
	}
}

class InternalServerError extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.INTERNAL_SERVER_ERROR,
		status: number = statusCodes.INTERNAL_SERVER_ERROR,
	) {
		super(message, status)
	}
}

class NotImplemented extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.NOT_IMPLEMENTED,
		status: number = statusCodes.NOT_IMPLEMENTED,
	) {
		super(message, status)
	}
}

class BadGateway extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.BAD_GATEWAY,
		status: number = statusCodes.BAD_GATEWAY,
	) {
		super(message, status)
	}
}

class ServiceUnavailable extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.SERVICE_UNAVAILABLE,
		status: number = statusCodes.SERVICE_UNAVAILABLE,
	) {
		super(message, status)
	}
}

export {
	BadRequest,
	Unauthorized,
	Forbidden,
	NotFound,
	MethodNotAllowed,
	NotAcceptable,
	RequestTimeout,
	Conflict,
	TooManyRequests,
	InternalServerError,
	NotImplemented,
	BadGateway,
	ServiceUnavailable,
}
