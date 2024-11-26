/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterPayload:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 */
export class RegisterPayload {
	name: string
	email: string
	password: string
}
