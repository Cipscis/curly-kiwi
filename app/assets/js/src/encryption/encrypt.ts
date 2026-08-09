import type { EncryptedMessage } from './EncryptedMessage';
import { encryptStatic } from './encryptStatic';
import { toHex } from './toHex';

/**
 * Encrypts a message with a given key source, constructing a random initialisation vector and salt.
 */
export async function encrypt(
	message: string,
	keySource: string,
): Promise<EncryptedMessage> {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const iv = crypto.getRandomValues(new Uint8Array(12));

	return await encryptStatic({
		message,
		keySource,
		iv: toHex(iv),
		salt: toHex(salt),
	});
}