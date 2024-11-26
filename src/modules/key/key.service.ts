import { type Key, keyModel } from './models/key.model'

export default class KeyService {
	static resolutionKey = 'keyService'

	async create(payload: Partial<Key>) {
		return await keyModel.create(payload)
	}
}
