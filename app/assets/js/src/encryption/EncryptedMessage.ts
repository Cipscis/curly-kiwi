/**
 * An object containing hexadecimal string representations of the bytes for an encrypted message, and the initialisation vector and salt used in its encryption.
 */
export interface EncryptedMessage {
	cypherText: string;
	iv: string;
	salt: string;
}