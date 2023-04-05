import Block from '../../utils/Block';
import template from './settings-action-link.hbs';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';

interface SettingsActionLinkProps extends PropsWithRouter {
	label: string;
	href: string;
	events?: Record<string, (e?: Event) => void>;
}

export class SettingsActionLinkBase extends Block<SettingsActionLinkProps> {
	constructor(props: SettingsActionLinkProps) {
		super('a', props);
		this.element!.classList.add('action__container');
		this.setProps({
			events: {
				...this.props.events,
				click: this.navigate.bind(this),
			},
		});
	}

	navigate(e?: Event) {
		if (!e) {
			return;
		}
		e.preventDefault();
		this.props.router.go(this.props.href);
	}

	protected render(): DocumentFragment {
		this.element!.setAttribute('href', this.props.href);
		return this.compile(template, { ...this.props });
	}
}

export const SettingsActionLink = withRouter(SettingsActionLinkBase as unknown as typeof Block);
