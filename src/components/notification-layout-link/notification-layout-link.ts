import Block from '../../utils/Block';
import template from './notification-layout-link.hbs';
import styles from './notification-layout-link.module.scss';

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
		console.log('styles.prompt', styles.prompt);
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
