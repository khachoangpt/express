import { BadRequest, Conflict } from '@/base/error.response'
import { RoleShop } from '@/constants/enums'
import { generateKeyPair } from '@/utils/generate-key-pair'
import { generateTokenPair } from '@/utils/generate-token-pair'
import { pick } from '@/utils/lodash'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type KeyService from '../key/key.service'
import { Shop } from '../shop/models/shop.model'
import type ShopService from '../shop/shop.service'
import type { LoginPayload } from './dtos/login.payload'
import type { LoginResponse } from './dtos/login.response'
import type { RefreshTokenPayload } from './dtos/refresh-token.payload'
import type { RefreshTokenResponse } from './dtos/refresh-token.response'
import type { RegisterPayload } from './dtos/register.payload'
import type { RegisterResponse } from './dtos/register.response'

type InjectedDependencies = {
	shopService: ShopService
	keyService: KeyService
}

export default class AuthService {
	static resolutionKey = 'authService'
	private readonly shopService: ShopService
	private readonly keyService: KeyService

	constructor({ shopService, keyService }: InjectedDependencies) {
		this.shopService = shopService
		this.keyService = keyService
	}

	/**
	 * Registers a new shop with the provided details.
	 *
	 * This method hashes the password, creates a new shop, generates a key pair,
	 * and issues a pair of access and refresh tokens. It also checks for email
	 * conflicts and handles error scenarios during shop creation.
	 *
	 * @param {RegisterPayload} payload - The registration details including name, email, and password.
	 * @returns {Promise<RegisterResponse>} The response containing the shop details and token pair.
	 * @throws {Conflict} If the email already exists or shop creation fails.
	 */
	async register(payload: RegisterPayload): Promise<RegisterResponse> {
		const { name, email, password } = payload
		const shopFound = await this.shopService.findByEmail(email)

		if (shopFound) {
			throw new Conflict('Email already exists')
		}

		const passwordHash = await bcrypt.hash(password, 10)
		const newShop = await this.shopService.create({
			name,
			email,
			password: passwordHash,
			roles: [RoleShop.SHOP],
		})

		if (!newShop) {
			throw new Conflict('Failed to create shop')
		}

		const { privateKey, publicKey } = await generateKeyPair()
		const { accessToken, refreshToken } = await generateTokenPair({
			payload: { sub: newShop._id },
			secretKey: privateKey,
		})
		await this.keyService.create({
			userId: newShop._id,
			publicKey,
			refreshToken,
		})

		return {
			shop: new Shop(pick(newShop, ['_id', 'name', 'email', 'status'])),
			accessToken,
			refreshToken,
		}
	}

	/**
	 * Login a shop.
	 *
	 * This method will check if the shop exists, is verified and has a valid password.
	 * If all checks pass, it will generate a new pair of access and refresh tokens.
	 *
	 * @param {LoginPayload} payload - The login payload containing the email and password.
	 *
	 * @throws {Conflict} If the shop doesn't exist, is not verified or has an invalid password.
	 *
	 * @returns {Promise<LoginResponse>} The login response containing the access and refresh tokens.
	 */
	async login(payload: LoginPayload): Promise<LoginResponse> {
		const shopFound = await this.shopService.findByEmail(payload.email)

		if (!shopFound) {
			throw new Conflict('Shop not found')
		}

		if (!shopFound.verify) {
			throw new Conflict('Shop not verified')
		}

		const isPasswordValid = await bcrypt.compare(
			payload.password,
			shopFound.password,
		)

		if (!isPasswordValid) {
			throw new Conflict('Invalid password')
		}

		const { privateKey, publicKey } = await generateKeyPair()
		const { accessToken, refreshToken } = await generateTokenPair({
			payload: { sub: shopFound._id },
			secretKey: privateKey,
		})

		await this.keyService.create({
			userId: shopFound._id,
			publicKey,
			refreshToken,
		})

		return {
			shop: new Shop(pick(shopFound, ['_id', 'name', 'email', 'status'])),
			accessToken,
			refreshToken,
		}
	}

	/**
	 * Refreshes a shop's access token.
	 *
	 * This method takes a refresh token as input, checks if it exists, is not used,
	 * and marks it as used. It then generates a new pair of access and refresh tokens,
	 * and creates a new key pair in the database. It also removes the old key pair from the database.
	 *
	 * @param {RefreshTokenPayload} payload - The refresh token payload.
	 * @returns {Promise<RefreshTokenResponse>} The response containing the new access and refresh tokens.
	 * @throws {BadRequest} If the refresh token is invalid or has already been used.
	 */
	async refreshToken(
		payload: RefreshTokenPayload,
	): Promise<RefreshTokenResponse> {
		const keyFound = await this.keyService.findByRefreshToken(
			payload.refreshToken,
		)

		if (!keyFound) {
			throw new BadRequest('Invalid refresh token')
		}

		try {
			jwt.verify(payload.refreshToken, keyFound.publicKey)
		} catch (_error) {
			await this.keyService.deleteByRefreshToken(keyFound.refreshToken)
			throw new BadRequest('Invalid refresh token')
		}

		if (keyFound.isUsed) {
			await this.keyService.deleteByUserId(keyFound.userId)
			throw new BadRequest('Invalid refresh token')
		}

		const { privateKey, publicKey } = await generateKeyPair()
		const { accessToken, refreshToken } = await generateTokenPair({
			payload: { sub: keyFound.userId },
			secretKey: privateKey,
		})

		await this.keyService.updateOne(
			{ _id: keyFound._id },
			{
				isUsed: true,
			},
		)

		await this.keyService.create({
			userId: keyFound.userId,
			publicKey,
			refreshToken,
		})

		return {
			accessToken,
			refreshToken,
		}
	}

	/**
	 * Logs out a shop by deleting the key pair associated with the given refresh token.
	 *
	 * @param {string} refreshToken - The refresh token to delete the key pair for.
	 * @returns {Promise<boolean>} Resolves with true if the key pair was deleted successfully.
	 * @throws {BadRequest} If the refresh token is invalid.
	 */
	async logout(refreshToken: string): Promise<boolean> {
		const res = await this.keyService.deleteByRefreshToken(refreshToken)
		if (res.deletedCount === 0) {
			throw new BadRequest('Invalid refresh token')
		}
		return true
	}
}
