async function importKey(source: string): Promise<CryptoKey> {
	const encoder = new TextEncoder();
	const keySource = encoder.encode(source);
	const key = await crypto.subtle.importKey(
		'raw',
		keySource,
		'PBKDF2',
		false,
		['deriveKey'],
	);

	return key;
}

/**
 * Derive a {@linkcode CryptoKey} based on a source text input and a salt.
 */
export async function deriveKey(source: string, salt: Uint8Array<ArrayBuffer>): Promise<CryptoKey> {
	const keySource  = await importKey(source);

	const key = await crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt,
			iterations: 100_000,
			hash: 'SHA-256',
		},
		keySource,
		{
			name: 'AES-GCM',
			length: 256,
		},
		false,
		['encrypt', 'decrypt'],
	);

	return key;
}