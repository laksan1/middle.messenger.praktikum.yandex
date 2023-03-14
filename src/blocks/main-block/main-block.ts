import Block from '../../utils/Block';
import template from './main-block.hbs';

type MainBlockProps = {
	events?: Record<string, (e?: Event) => void>;
}

export class MainBlock extends Block<MainBlockProps> {
	constructor(props: MainBlockProps) {
		super('ul', props);
		this.element!.classList.add('menu');
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
