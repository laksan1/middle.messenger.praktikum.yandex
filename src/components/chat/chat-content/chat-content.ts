import Block from '../../../utils/Block'
import template from './chat-content.hbs'

import { withUserAndMessages } from '../../../utils/Store'
import { User } from '../../../interfaces/auth/user.interface'
import { Message } from '../../../interfaces/chat/message.interface'
import { openModalWindow } from '../../../utils/ModalWindow'
import { Chat } from '../../../interfaces/chat/chat.interface'
import ChatsController from '../../../controllers/ChatsController'
import ChatShowUsersModal from '../../../modal-windows/chat/chat-show-users-modal'
import ChatDeleteChatModal from '../../../modal-windows/chat/chat-delete-chat-modal'

type ChatContentProps = {
	chatId: number;
	user_data: User;
	chatConsole: Block;
	messages: Message[];
};

enum Actions {
	SHOW_USERS = 'showusers',
	REMOVE_CHAT = 'removechat',
}

const ownerActionsList = [
	{
		action: Actions.SHOW_USERS,
		name: 'Посмотреть пользователей'
	},
	{
		action: Actions.REMOVE_CHAT,
		name: 'Удалить чат'
	}
]

const baseActionsList = [
	{
		action: Actions.SHOW_USERS,
		name: 'Посмотреть пользователей'
	}
]

 class ChatContentNoUserAndMessages extends Block<ChatContentProps> {
	chatData: Chat | undefined
	actionsList: Record<string, string>[] | undefined

	constructor(props: ChatContentProps) {
		super('section', props)
		this.element!.classList.add('chat-content')

		this.element!.addEventListener('click', (e) => {
			const target = e.target as HTMLElement

			if (target.hasAttribute('data-action')) {
				e.preventDefault()
				const action = target.getAttribute('data-action')
				console.log('action', action)

				switch (action) {
					case Actions.SHOW_USERS: {
						openModalWindow(ChatShowUsersModal)
						break
					}
					case Actions.REMOVE_CHAT: {
						openModalWindow(ChatDeleteChatModal)
						break
					}
				}
			}
		})
	}

	init() {
		this.chatData = ChatsController.getChatData(this.props.chatId)
		if (this.props.user_data.id === this.chatData.created_by) {
			this.actionsList = ownerActionsList
		} else {
			this.actionsList = baseActionsList
		}
	}

	componentDidMount() {
		ChatsController.updateChatData(this.props.chatId, 'unread_count', 0)
		const dialogTimeline = document.querySelector('.dialog-timeline')
		if (dialogTimeline) {
			dialogTimeline.scrollTop = dialogTimeline.scrollHeight
		}
	}

	protected render(): DocumentFragment {
		return this.compile(template, {
			...this.props,
			userId: this.props.user_data?.id,
			actionsList: this.actionsList,
			chatData: this.chatData
		})
	}
}

export const ChatContent = withUserAndMessages(ChatContentNoUserAndMessages as unknown as typeof Block)
