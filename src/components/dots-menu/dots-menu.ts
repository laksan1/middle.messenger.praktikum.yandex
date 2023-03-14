import Block from '../../utils/Block';
import template from './dots-menu.hbs';

type DotsMenuProps = {
	href: string;
	events?: Record<string, (e?: Event) => void>;

};
export class DotsMenu extends Block<DotsMenuProps> {
	constructor(props: DotsMenuProps) {
		super('a', props);
		this.element!.classList.add('dots');
	}

	protected render() {
		this.element!.setAttribute('href', this.props.href);
		return this.compile(template, { ...this.props })
	}
}
