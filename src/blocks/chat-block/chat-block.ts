import {NotificationLayoutLink} from "../../components/notification-layout-link/notification-layout-link";
import Block from "../../utils/Block";
import template from "../not-found-block/not-found-block.hbs";

type ChatBlockProps = {
	label: string;
	description: string;
	link?: NotificationLayoutLink;
}

export class ChatBlock extends Block<ChatBlockProps> {
	constructor(props: ChatBlockProps) {
		super('div', props);
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
