import { deriveKey } from './deriveKey';
import type { EncryptedMessage } from './EncryptedMessage';
import { fromHex } from './fromHex';
import { toHex } from './toHex';

export interface EncryptStaticOptions {
	message: string;
	keySource: string;
	iv: string;
	salt: string;
}

/**
 * Encrypts a message with a given key source, and a given initialisation vector and salt as hexadecimal strings.
 */
export async function encryptStatic(options: EncryptStaticOptions): Promise<EncryptedMessage> {
	const {
		message,
		keySource,
		iv,
		salt,
	} = options;

	const ivRaw = fromHex(iv);
	const saltRaw = fromHex(salt);

	const key = await deriveKey(keySource, saltRaw);

	const encoder = new TextEncoder();
	const encodedMessage = encoder.encode(message);

	const cypherTextRaw = await crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv: ivRaw,
		},
		key,
		encodedMessage,
	);
	const cypherText = toHex(cypherTextRaw);

	return {
		cypherText,
		iv,
		salt,
	};
}