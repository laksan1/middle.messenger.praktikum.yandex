import {ModalWindowLayout} from "../layouts/modal-window/modal-window-layout";

function openModalWindow(modal: ModalWindowLayout): void {
	const root = document.querySelector('#main');
	if (!root) return;

	let modalsContainer = root.querySelector('.modal-container');
	if (!modalsContainer) {
		modalsContainer = document.createElement('div');
		modalsContainer.classList.add('modal-container');
		root.append(modalsContainer);
	}

	modalsContainer.append(modal.getContent()!);
}

function closeModalWindow() {
	console.log('CLose modal')
	const modalsContainer = document.querySelector('.modal-container');
	if (!modalsContainer) return;

	modalsContainer.innerHTML = '';
}

export { openModalWindow, closeModalWindow };
