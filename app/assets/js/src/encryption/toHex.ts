import type { fromHex } from './fromHex';

/**
 * Converts an ArrayBuffer to a displayable hexadecimal string representation.
 *
 * @see {@linkcode fromHex} for the reverse operation.
 */
export function toHex(buffer: ArrayLike<number> | ArrayBuffer): string {
	return Array.from(
		new Uint8Array(buffer)
	).map(valueToHex).join('');
}

/**
 * Converts a single number (assuming an 8-bit unsigned integer) to its hexadecimal string representation.
 */
function valueToHex(value: number) {
	return value.toString(16).padStart(2, '0');
}