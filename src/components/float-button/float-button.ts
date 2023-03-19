import Block from '../../utils/Block';
import template from '../notification-layout-link/notification-layout-link.hbs';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter'

export interface FloatButtonProps  extends PropsWithRouter{
	href: string;
	events?: Record<string, (e?: Event) => void>;
}
class  FloatButtonWithoutRouter extends Block<FloatButtonProps> {
	constructor(props: FloatButtonProps) {
		super('a', props);
		this.element!.classList.add('float-button');
		this.setProps({
			events: {
				...this.props.events,
				click: this.navigate.bind(this)
			}
		});
	}

	navigate(e: Event) {
		e.preventDefault();
		this.props.router.go(this.props.href);
	}

	protected render(): DocumentFragment {
		this.element!.setAttribute('href', this.props.href);
		return this.compile(template, {...this.props})
	}
}

export const FloatButton = withRouter(FloatButtonWithoutRouter as unknown as typeof Block);
