import Block from "../../../utils/Block";
import template from "./chat-messages.hbs";

type ChatMessagesProps = {
	events?: Record<string, (e?: Event) => void>;
}
export class ChatMessages extends Block<ChatMessagesProps> {
	constructor(props: ChatMessagesProps) {
		super('div', props);
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
