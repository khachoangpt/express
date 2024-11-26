import type { NextFunction, Request, Response } from 'express'

type AsyncHandlerType = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>

/**
 * A higher-order function that wraps an async route handler
 * with a try/catch block, calling the `next` function
 * with any errors that occur.
 *
 * @param fn - The async route handler to wrap.
 */
export const asyncHandler = (fn: AsyncHandlerType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next)
	}
}
