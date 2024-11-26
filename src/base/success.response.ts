import { statusCodes } from '@/constants/status-codes'
import type { Response } from 'express'

class SuccessResponse<T> {
	private status: number
	private metadata: T

	constructor(status: number, metadata: T) {
		this.status = status || statusCodes.OK
		this.metadata = metadata
	}

	send(res: Response, headers?: Record<string, string>) {
		if (headers) {
			for (const [key, value] of Object.entries(headers)) {
				res.setHeader(key, value)
			}
		}

		return res.status(this.status).json(this.metadata)
	}
}

class OK<T> extends SuccessResponse<T> {
	constructor(metadata: T) {
		super(statusCodes.OK, metadata)
	}
}

class Created<T> extends SuccessResponse<T> {
	constructor(metadata: T) {
		super(statusCodes.CREATED, metadata)
	}
}

class Accepted<T> extends SuccessResponse<T> {
	constructor(metadata: T) {
		super(statusCodes.ACCEPTED, metadata)
	}
}

export { OK, Created, Accepted }
