import Block from "../../utils/Block";
import template from "../auth-layout-link/auth-layout-link.hbs";
import * as styles from "./settings-action-link.module.scss";

type SettingsActionLinkProps = {
	label: string;
	href: string;
	events?: Record<string, (e?: Event) => void>;
}
export class SettingsActionLink extends Block<SettingsActionLinkProps> {
	constructor(props: SettingsActionLinkProps) {
		super('a', props);
		this.element!.classList.add(styles.action__container__label);
	}

	protected render(): DocumentFragment {
		this.element!.setAttribute('href', this.props.href);
		return this.compile(template, {...this.props})
	}
}
