import jwt from 'jsonwebtoken'

type GenerateTokenPairPayload = {
	payload: Record<string, unknown>
	secretKey: string
}

type GenerateTokenPairResponse = {
	accessToken: string
	refreshToken: string
}

/**
 * Generates a pair of JSON Web Tokens (JWTs) for a given payload and secret key.
 * The first token is an access token with a short expiration time (15 minutes).
 * The second token is a refresh token with a longer expiration time (30 days).
 * @param {GenerateTokenPairPayload} generateTokenPairPayload The payload and secret key for generating the tokens.
 * @returns {GenerateTokenPairResponse} The generated access token and refresh token.
 */
export const generateTokenPair = async (
	generateTokenPairPayload: GenerateTokenPairPayload,
): Promise<GenerateTokenPairResponse> => {
	const { payload, secretKey } = generateTokenPairPayload
	const accessToken = jwt.sign(payload, secretKey, {
		algorithm: 'RS256',
		expiresIn: '15m',
	})
	const refreshToken = jwt.sign(payload, secretKey, {
		algorithm: 'RS256',
		expiresIn: '30d',
	})

	return { accessToken, refreshToken }
}
