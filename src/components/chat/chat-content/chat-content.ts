import Block from '../../../utils/Block'
import template from './chat-content.hbs'
import { ChatContentHeader } from '../chat-content-header/chat-content-header'
import { ChatMessages } from '../chat-messages/chat-messages'
import { ChatConsole } from '../chat-console/chat-console'
import { withUserAndMessages } from '../../../utils/Store'
import { User } from '../../../interfaces/auth/user.interface'
import { Message } from '../../../interfaces/chat/message.interface'
import { openModalWindow } from '../../../utils/ModalWindow'
import settingsChangePasswordModal from '../../../modal-windows/settings-change-password/settings-change-password-modal'
import { Chat } from '../../../interfaces/chat/chat.interface'
import ChatsController from '../../../controllers/ChatsController'
import { LogoutButton } from '../../logout-button/logout-button'
import loginPage from '../../../pages/login/login'
import { DotsMenu } from '../../dots-menu/dots-menu'

/*type ChatContentProps = {
	chatContentHeader: ChatContentHeader;
	ChatMessages: Block;
	ChatConsole: Block;
	events?: Record<string, (e?: Event) => void>;
}*/

type ChatContentProps = {
	chatId: number;
	user_data: User;
	chatConsole: Block;
	dotsMenu: Block;
	messages: Message[];
};

enum  Actions {
	SHOW_USERS = 'showusers',
	REMOVE_CHAT = 'removechat',
}

const ownerActionsList = [
	{
		action: Actions.SHOW_USERS,
		name: 'View participants'
	},
	{
		action: Actions.REMOVE_CHAT,
		name: 'Delete chat'
	}
]

const baseActionsList = [
	{
		action: 'viewUsers',
		name: 'View participants'
	}
]

export class ChatContentNoUserAndMessages extends Block<ChatContentProps> {
	chatData: Chat | undefined
	actionsList: Record<string, string>[] | undefined

	constructor(props: ChatContentProps) {
		super('section', props)
		this.element!.classList.add('dialog')

		this.element!.addEventListener('click', (e) => {
			const target = e.target as HTMLElement

			if (target.hasAttribute('data-action')) {
				e.preventDefault()
				const action = target.getAttribute('data-action')
				console.log('action', action)

				switch (action) {
					case Actions.SHOW_USERS: {
						openModalWindow(settingsChangePasswordModal)
						break
					}
					case Actions.REMOVE_CHAT: {
						openModalWindow(settingsChangePasswordModal)
						break
					}
				}
			}
		})

	}

	init() {
		console.log('messages', this.props.messages)
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
