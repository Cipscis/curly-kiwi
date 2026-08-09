import {
	type EncryptedMessage,
	decrypt,
} from 'encryption';

/**
 * This static encrypted message contains all information necessary for decryption except the key source string. It is intended not to make the encrypted message unavailable, but to make it difficult to scrape from the web or from this repo's source code.
 */
const encryptedMessage: EncryptedMessage = {
	cypherText: '15f4ee329470af5731c3b12997b5c946ecaee87e83ae5e5bf9be79ec84e6706115a34d',
	iv: '3d7d113e425bc61bc6db7c34',
	salt: '1eb5661bad7e81fcebd67c7c0f03ff4c',
};

export class BankAccountNumber extends HTMLElement {
	#disconnectedController: AbortController | null;

	constructor() {
		super();

		this.#disconnectedController = null
	}

	async connectedCallback() {
		this.#disconnectedController = new AbortController();
		const disconnectedSignal = this.#disconnectedController.signal;

		const label = document.createElement('span');
		label.classList.add('bank-account__label');
		label.textContent = 'Bank account';
		this.appendChild(label);

		const display = document.createElement('span');
		display.classList.add('bank-account__display');
		display.textContent = '00-0000-0000000-000';
		this.appendChild(display);

		const revealButton = document.createElement('button');
		revealButton.type = 'button';
		revealButton.classList.add('bank-account__reveal');
		revealButton.textContent = 'Reveal';
		this.appendChild(revealButton);

		const error = document.createElement('span');
		error.classList.add('bank-account__error');
		this.appendChild(error);

		revealButton.addEventListener('click', async () => {
			try {
				error.textContent = '';

				const decryptionKeySource = (window.prompt('What is my name?') ?? '').toLowerCase();
				const decryptedMessage = await decrypt(encryptedMessage, decryptionKeySource);
				display.textContent = decryptedMessage;

				revealButton.remove();

				const copyButton = document.createElement('button');
				copyButton.type = 'button';
				copyButton.classList.add('bank-account__copy');
				copyButton.textContent = 'Copy';
				display.insertAdjacentElement('afterend', copyButton);

				copyButton.addEventListener('click', async () => {
					await navigator.clipboard.writeText(display.textContent);
					copyButton.textContent = 'Copied!';
					setTimeout(() => copyButton.textContent = 'Copy', 5_000);
				}, { signal: disconnectedSignal });
			} catch (e) {
				error.textContent = 'That was incorrect';
			}
		}, {
			signal: disconnectedSignal,
		});
	}

	disconnectedCallback() {
		if (this.#disconnectedController) {
			this.#disconnectedController.abort();
		}
	}

	connectedMoveCallback() {
		// Empty callback to stop disconnectedCallback and connectedCallback running when the element is moved
	}
}