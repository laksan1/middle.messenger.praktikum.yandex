import { ModalWindowLayout } from '../layouts/modal-window/modal-window-layout';

function openModalWindow(modal: ModalWindowLayout): void {
	const root = document.querySelector('#app');
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
	const modalsContainer = document.querySelector('.modal-container');
	console.log('CLose modal', modalsContainer);
	if (!modalsContainer) return;

	modalsContainer.innerHTML = '';
}

export { openModalWindow, closeModalWindow };
