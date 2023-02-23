import Block from "../../utils/Block";
import template from "../notification-layout-link/notification-layout-link.hbs";
import styles from  "./logout-button.module.scss";

type LogoutButtonProps = {
	label: string;
	href: string;
	events?: Record<string, (e?: Event) => void>;
}
export class  LogoutButton extends Block<LogoutButtonProps> {
	constructor(props: LogoutButtonProps) {
		super('button', props);
		this.element!.classList.add(styles.logout__button);
	}

	protected render(): DocumentFragment {
		this.element!.setAttribute('href', this.props.href);
		return this.compile(template, {...this.props})
	}
}
