import Block from '../../utils/Block';
import template from '../auth-layout-link/auth-layout-link.hbs';
import * as styles from './settings-action-link.module.scss';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';

interface SettingsActionLinkProps extends PropsWithRouter {
	label: string;
	href: string;
	events?: Record<string, (e?: Event) => void>;
}

class SettingsActionLinkBase extends Block<SettingsActionLinkProps> {
	constructor(props: SettingsActionLinkProps) {
		super('a', props);
		this.element!.classList.add(styles.action__container__label);
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
