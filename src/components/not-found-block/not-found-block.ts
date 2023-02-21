import Block from "../../utils/Block";
import template from "./not-found-block.hbs";
import {NotificationLayoutLink} from "../notification-layout-link/notification-layout-link";
import styles from "./not-found-block.module.scss";

type NotFoundBlockProps = {
	label: string;
	description: string;
	link?: NotificationLayoutLink;
}

export class NotFoundBlock extends Block<NotFoundBlockProps> {
	constructor(props: NotFoundBlockProps) {
		super('div', props);
		this.element?.classList.add(styles.notfound__block);
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
