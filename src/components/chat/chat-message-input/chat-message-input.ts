import Block from "../../../utils/Block";
import template from "./chat-message-input.hbs";

type ChatMessageInputProps = {
	placeholder: string;
	name: string;
	error?: string;
	value?: string;
	events?: Record<string, (e?: Event) => void>;
}
export class ChatMessageInput extends Block<ChatMessageInputProps> {
	constructor(props: ChatMessageInputProps) {
		super('label', props);
		this.element!.classList.add('chat-message-input');
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

}
