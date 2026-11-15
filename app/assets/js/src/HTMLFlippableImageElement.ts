export class HTMLFlippableImageElement extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const image = this.querySelector('[slot="image"]');
		if (!(image instanceof HTMLImageElement)) {
			throw new Error('No `<img>` element found');
		}

		const card = document.createElement('div');
		card.classList.add('card');
		this.appendChild(card);

		const front = document.createElement('div');
		front.classList.add('front');
		card.appendChild(front);
		front.appendChild(image);

		const back = document.createElement('div');
		back.classList.add('back');
		card.appendChild(back);

		const imageCopy = image.cloneNode() as HTMLImageElement;
		imageCopy.alt = '';
		back.appendChild(imageCopy);

		const note = this.querySelector('[slot="note"]');
		if (note) {
			note.classList.add('note');
			note.classList.add('light');
			back.appendChild(note);
		}

		const button = document.createElement('button');
		button.classList.add('flip');
		button.textContent = 'Flip';
		button.addEventListener('click', () => {
			card.classList.toggle('flipped');
		});
		this.appendChild(button);
	}
}