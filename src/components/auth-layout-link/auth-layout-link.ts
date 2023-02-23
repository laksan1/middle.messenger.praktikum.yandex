import Block from '../../utils/Block';
import template from './auth-layout-link.hbs';

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
	}

	protected render(): DocumentFragment {
		this.element!.setAttribute('href', this.props.href);
		return this.compile(template, {...this.props})
	}
}
