import Block from '../../../utils/Block'
import template from './chat-messages.hbs'
import { User } from '../../../interfaces/auth/user.interface'
import { Message } from '../../../interfaces/chat/message.interface'
import { withUserAndMessages } from '../../../utils/Store'


export interface ChatMessagesProps extends Message, User{
	chatId: number;
	user_data: User;
	messages: Message[];
}

class ChatMessagesWithoutStore extends Block<ChatMessagesProps> {
	constructor(props: ChatMessagesProps) {
		super('div', props)
	}


	protected render(): DocumentFragment {
		return this.compile(template, { ...this.props })
	}

	init() {
		console.log('init')

	}
}


export const ChatMessages = withUserAndMessages(ChatMessagesWithoutStore as unknown as typeof Block)
