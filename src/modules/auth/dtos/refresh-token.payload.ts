/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshTokenPayload:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 */
export class RefreshTokenPayload {
	refreshToken: string
}
