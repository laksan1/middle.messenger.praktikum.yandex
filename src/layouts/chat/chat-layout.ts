import Block from '../../utils/Block';
import template from './chat-layout.hbs';
import {ChatSidebar} from '../../components/chat/chat-sidebar/chat-sidebar';
import {ChatContent} from '../../components/chat/chat-content/chat-content';

type ChatLayoutProps = {
	chatSidebar: ChatSidebar;
	chatContent: ChatContent;
}

export class ChatLayout extends Block<ChatLayoutProps> {
	constructor(props: ChatLayoutProps) {
		super('div', props);
		this.element!.classList.add('chat-layout');
	}

	render() {
		if (this.children.dialog) {
			this.element!.classList.add('chats-layout_dialog');
		}
		return this.compile(template, { ...this.props });
	}

	componentDidMount() {
		Object.values(this.children).forEach((child) => {
			child.dispatchComponentDidMount()
		})
	}
}
