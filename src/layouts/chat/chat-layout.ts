import Block from "../../utils/Block";
import template from './chat-layout.hbs';
import styles from "../settings/settings-layout.module.scss";
import {ChatBlock} from "../../blocks/chat-block/chat-block";

type ChatLayoutProps = {
	component: ChatBlock;
}

export class ChatLayout extends Block<ChatLayoutProps> {
	constructor(props: ChatLayoutProps) {
		super('div', props);
	}

	protected render(): DocumentFragment {
		return super.compile(template, {...this.props, styles});
	}
}
