/**
 * @swagger
 * components:
 *   schemas:
 *     LogoutPayload:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 */
export class LogoutPayload {
	refreshToken: string
}
