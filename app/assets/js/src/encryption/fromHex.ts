import type { toHex } from './toHex';

/**
 * Converts a hexadecimal string into its binary representation.
 *
 * @see {@linkcode toHex} for the reverse operation.
 */
export function fromHex(string: string): Uint8Array<ArrayBuffer> {
	if (string.length % 2) {
		throw new Error(`String ${string} is invalid for conversion from hex`);
	}

	const valuesArray = new Uint8Array(string.length / 2);

	// Split into two-character chunks
	const values = string.match(/.{2}/g)!;

	for (const [i, value] of values.entries()) {
		const rawValue = parseInt(value, 16);
		if (isNaN(rawValue)) {
			throw new Error(`String ${string} is invalid for conversion from hex`);
		}
		valuesArray[i] = rawValue;
	}

	return valuesArray;
}