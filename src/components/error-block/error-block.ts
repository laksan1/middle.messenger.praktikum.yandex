import Block from "../../utils/Block";
import template from "./error-block.hbs";
import {NotificationLayoutLink} from "../notification-layout-link/notification-layout-link";
import styles from "./error-block.module.scss";

type ErrorBlockProps = {
	label: string;
	description: string;
	link?: NotificationLayoutLink;
}

export class ErrorBlock extends Block<ErrorBlockProps> {
	constructor(props: ErrorBlockProps) {
		super('div', props);
		this.element?.classList.add(styles.error__block);
	}

	render() {
		console.log('template', template)
		return this.compile(template, { ...this.props })
	}
}
