enum DatabaseType {
	MONGO = 'mongo',
}

enum NodeEnv {
	DEVELOPMENT = 'development',
	PRODUCTION = 'production',
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ShopStatus:
 *       type: string
 *       enum:
 *         - active
 *         - inactive
 */
enum ShopStatus {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

/**
 * @swagger
 * components:
 *   schemas:
 *     RoleShop:
 *       type: string
 *       enum:
 *         - shop
 *         - writer
 *         - editor
 *         - admin
 */
enum RoleShop {
	SHOP = 'shop',
	WRITER = 'writer',
	EDITOR = 'editor',
	ADMIN = 'admin',
}

enum Header {
	CLIENT_ID = 'x-client-id',
	REFRESH_TOKEN = 'x-refresh-token',
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductType:
 *       type: string
 *       enum:
 *         - electronic
 *         - furniture
 *         - clothing
 */
enum ProductType {
	ELECTRONIC = 'electronic',
	FURNITURE = 'furniture',
	CLOTHING = 'clothing',
}

export { DatabaseType, NodeEnv, ShopStatus, RoleShop, Header, ProductType }
