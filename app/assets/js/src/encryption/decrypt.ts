import { deriveKey } from './deriveKey';
import type { EncryptedMessage } from './EncryptedMessage';
import { fromHex } from './fromHex';

/**
 * Decrypts a {@linkcode EncryptedMessage}, given its key source string.
 */
export async function decrypt(
	encryptedMessage: EncryptedMessage,
	keySource: string,
): Promise<string> {
	const {
		cypherText,
		iv,
		salt,
	} = encryptedMessage;

	const key = await deriveKey(keySource, fromHex(salt));

	const decryptedMessage = await crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv: fromHex(iv),
		},
		key,
		fromHex(cypherText),
	);

	const decoder = new TextDecoder();
	const plainText = decoder.decode(decryptedMessage);

	return plainText;
}