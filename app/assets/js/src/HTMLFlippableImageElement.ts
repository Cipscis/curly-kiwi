export class HTMLFlippableImageElement extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const button = document.createElement('button');
		button.classList.add('flip');
		button.textContent = 'Flip';
		button.addEventListener('click', () => {
			this.querySelector('.card')?.classList.toggle('flipped');
		});
		this.appendChild(button);
	}
}