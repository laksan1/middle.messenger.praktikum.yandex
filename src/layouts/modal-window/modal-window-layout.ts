import Block from '../../utils/Block';
import template from './modal-window-layout.hbs';
import { closeModalWindow } from '../../utils/ModalWindow'

type modalProps = {
	modal: Partial<Block>;
};

export class ModalWindowLayout extends Block<modalProps> {
	constructor(props: modalProps) {
		super('section', props);
		// this.element?.addEventListener('mousedown', this.close.bind(this))
	}

	close(e: Event){
		if (!e.target) return;
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}

