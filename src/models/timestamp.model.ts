export class Timestamp {
	constructor(partial: Partial<Timestamp>) {
		Object.assign(this, partial)
	}

	createdAt?: NativeDate

	updatedAt?: NativeDate
}
