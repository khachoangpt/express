import { BadRequest } from '@/base/error.response'
import { Header } from '@/constants/enums'
import KeyService from '@/modules/key/key.service'
import { asyncHandler } from '@/utils/async-handler'
import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

export const authentication = asyncHandler(
	async (req: Request, _res: Response, next: NextFunction) => {
		const clientId = req.headers[Header.CLIENT_ID]

		if (!clientId || typeof clientId !== 'string') {
			throw new BadRequest('Missing client id')
		}

		const keyService: KeyService = req.scope.resolve(KeyService.resolutionKey)
		const keyFound = await keyService.findByUserId(
			new Types.ObjectId(clientId),
			{},
			{ limit: 1 },
		)

		if (!keyFound || keyFound.length === 0) {
			throw new BadRequest('Invalid client id')
		}

		const accessToken = req.headers.authorization?.split(' ')[1]

		if (!accessToken) {
			throw new BadRequest('Missing access token')
		}

		try {
			const decoded = jwt.verify(accessToken, keyFound.at(0)?.publicKey || '')
			if (decoded.sub !== clientId) {
				throw new BadRequest('Invalid access token')
			}
			req.userId = decoded.sub
			return next()
		} catch (_error) {
			throw new BadRequest('Invalid access token')
		}
	},
)
