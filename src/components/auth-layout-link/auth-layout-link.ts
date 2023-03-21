import Block from '../../utils/Block';
import template from './auth-layout-link.hbs';
import * as styles from './auth-layout-link.module.scss';

type AuthLayoutLinkProps = {
	label: string;
	href: string;
	events?: Record<string, (e?: Event) => void>;
};
export class AuthLayoutLink extends Block<AuthLayoutLinkProps> {
	constructor(props: AuthLayoutLinkProps) {
		super('a', props);
		this.element!.classList.add(styles.prompt);
	}

	protected render(): DocumentFragment {
		this.element!.setAttribute('href', this.props.href);
		return this.compile(template, { ...this.props });
	}
}
