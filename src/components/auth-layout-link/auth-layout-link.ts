import Block from '../../utils/Block';
import template from './auth-layout-link.hbs';
import styles from './auth-layout-link.module.scss';

type AuthLayoutLinkProps = {
	label: string;
	href: string;
	additionalClasses?: string[];
	styleClasses?: string[];
	events?: Record<string, (e?: Event) => void>;
}
export class AuthLayoutLink extends Block<AuthLayoutLinkProps> {
	constructor(props: AuthLayoutLinkProps) {
		super('a', props);
		this.element?.classList.add(styles.prompt);
	}

	protected render(): DocumentFragment {
		if (!this.props.styleClasses) {
			this.element!.classList.add(styles.prompt)
		} else {
			this.element!.classList.add(...this.props.styleClasses)
		}

		if (this.props.additionalClasses) {
			this.element!.classList.add(...this.props.additionalClasses)
		}

		this.element!.setAttribute('href', this.props.href);

		return this.compile(template, {...this.props})
	}
}
