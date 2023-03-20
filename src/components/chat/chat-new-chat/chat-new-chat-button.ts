import Block from '../../../utils/Block';
import template from '../../notification-layout-link/notification-layout-link.hbs';

type ChatNewChatButtonProps = {
	label: string;
	events?: Record<string, (e?: Event) => void>;
};

export class ChatNewChatButton extends Block<ChatNewChatButtonProps> {
	constructor(props: ChatNewChatButtonProps) {
		super('a', props);
		this.element!.classList.add('chat-new-chat');
	}

	protected render(): DocumentFragment {
		return this.compile(template, { ...this.props });
	}
}
