import { ProductType } from '@/constants/enums'
import { Clothing } from './models/clothing.model'
import { Electronic } from './models/electronic.model'
import { Furniture } from './models/furniture.model'

export default {
	[ProductType.CLOTHING]: Clothing,
	[ProductType.ELECTRONIC]: Electronic,
	[ProductType.FURNITURE]: Furniture,
}
