import Block from '../../../utils/Block';
import template from './chat-console.hbs';
import {ChatAttachButton} from '../chat-attach-button/chat-attach-button';
import {ChatMessageInput} from '../chat-message-input/chat-message-input';
import {ChatSendButton} from '../chat-send-button/chat-send-button';

type ChatConsoleProps = {
	chatAttachButton: ChatAttachButton;
	chatMessageInput: ChatMessageInput;
	chatSendButton: ChatSendButton;
	events?: Record<string, (e?: Event) => void>;
}
export class ChatConsole extends Block<ChatConsoleProps> {
	constructor(props: ChatConsoleProps) {
		super('form', props);
		this.element!.classList.add('chat-console');
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
