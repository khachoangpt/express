import { generateKeyPairSync } from 'node:crypto'

/**
 * Asynchronously generates a pair of RSA keys.
 *
 * The keys are generated with a modulus length of 4096 bits and encoded
 * in PEM format using PKCS#1.
 *
 * @returns A promise that resolves to an object containing the generated
 * public and private keys.
 */
export const generateKeyPair = async (): Promise<{
	publicKey: string
	privateKey: string
}> => {
	const { publicKey, privateKey } = generateKeyPairSync('rsa', {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: 'pkcs1',
			format: 'pem',
		},
		privateKeyEncoding: {
			type: 'pkcs1',
			format: 'pem',
		},
	})

	return { publicKey, privateKey }
}
