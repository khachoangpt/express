import type { Types } from 'mongoose'

class BaseModel {
	constructor(partial: Partial<BaseModel>) {
		Object.assign(this, partial)
	}

	_id?: Types.ObjectId
	createdAt?: NativeDate
	updatedAt?: NativeDate
}

export { BaseModel }
