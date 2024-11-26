import { reasonPhrases } from '@/constants/reason-phrases'
import { statusCodes } from '@/constants/status-codes'

class ErrorResponse extends Error {
	constructor(message: string, status: number) {
		super(message)
		this.status = status
	}
}

export class BadRequest extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.BAD_REQUEST,
		status: number = statusCodes.BAD_REQUEST,
	) {
		super(message, status)
	}
}

export class NotFound extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.NOT_FOUND,
		status: number = statusCodes.NOT_FOUND,
	) {
		super(message, status)
	}
}

export class Unauthorized extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.UNAUTHORIZED,
		status: number = statusCodes.UNAUTHORIZED,
	) {
		super(message, status)
	}
}

export class Conflict extends ErrorResponse {
	constructor(
		message: string = reasonPhrases.CONFLICT,
		status: number = statusCodes.CONFLICT,
	) {
		super(message, status)
	}
}
