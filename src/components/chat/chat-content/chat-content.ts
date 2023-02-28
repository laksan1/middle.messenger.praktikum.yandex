import Block from "../../../utils/Block";
import template from "./chat-content.hbs";
import {ChatContentHeader} from "../chat-content-header/chat-content-header";
import {ChatMessages} from "../chat-messages/chat-messages";
import {ChatConsole} from "../chat-console/chat-console";

type ChatContentProps = {
	chatContentHeader: ChatContentHeader;
	chatMessages: ChatMessages;
	chatConsole: ChatConsole;
	events?: Record<string, (e?: Event) => void>;
}
export class ChatContent extends Block<ChatContentProps> {
	constructor(props: ChatContentProps) {
		super('div', props);
		this.element!.classList.add('chat-content');

	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
