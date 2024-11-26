import { type PartialObject, pick as lodashPick } from 'lodash'

/**
 * Returns a new object with only the specified keys from the given object.
 * @param obj The object to pick from.
 * @param keys The keys to pick.
 * @returns A new object with the picked keys.
 */
const pick = <T, K extends keyof T>(obj: T, keys: K[]): PartialObject<T> => {
	return lodashPick(obj, keys)
}

export { pick }
