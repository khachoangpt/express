import { Conflict } from '@/base/error.response'
import { RoleShop } from '@/constants/enums'
import { generateKeyPair } from '@/utils/generate-key-pair'
import { generateTokenPair } from '@/utils/generate-token-pair'
import { pick } from '@/utils/lodash'
import bcrypt from 'bcrypt'
import type KeyService from '../key/key.service'
import { Shop } from '../shop/models/shop.model'
import type ShopService from '../shop/shop.service'
import type { LoginPayload } from './dtos/login.payload'
import type { LoginResponse } from './dtos/login.response'
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
}
