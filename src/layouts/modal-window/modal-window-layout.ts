import Block from '../../utils/Block';
import template from './modal-window-layout.hbs';

type modalProps = {
	modal: Partial<Block>;
};

export class ModalWindowLayout extends Block<modalProps> {
	constructor(props: modalProps) {
		super('section', props);
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}

