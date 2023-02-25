import Block from '../../utils/Block';
import template from './notification-layout-link.hbs';
import styles from "../auth-layout-link/auth-layout-link.module.scss";

type NotificationLayoutLinkProps = {
	label: string;
	href: string;
	additionalClasses?: string[];
	styleClasses?: string[];
	events?: Record<string, (e?: Event) => void>;
}
export class  NotificationLayoutLink extends Block<NotificationLayoutLinkProps> {
	constructor(props: NotificationLayoutLinkProps) {
		super('a', props);
		this.element!.classList.add(styles.prompt);
	}

	protected render(): DocumentFragment {
		this.element!.setAttribute('href', this.props.href);
		return this.compile(template, {...this.props})
	}
}
