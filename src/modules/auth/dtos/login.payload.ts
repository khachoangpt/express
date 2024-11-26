/**
 * @swagger
 * components:
 *   schemas:
 *     LoginPayload:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 */
export class LoginPayload {
	email: string
	password: string
}
