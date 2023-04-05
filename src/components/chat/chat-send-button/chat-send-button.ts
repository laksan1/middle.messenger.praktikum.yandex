import Block from '../../../utils/Block';
import template from './chat-send-button.hbs';

type ChatSendButtonProps = {
	label: string;
	events?: Record<string, (e?: Event) => void>;
};

export class ChatSendButton extends Block<ChatSendButtonProps> {
	constructor(props: ChatSendButtonProps) {
		super('button', props);
		this.element!.classList.add('send-button');
	}

	protected render(): DocumentFragment {
		return this.compile(template, { ...this.props });
	}
}
