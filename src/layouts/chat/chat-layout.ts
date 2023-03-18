import Block from '../../utils/Block'
import template from './chat-layout.hbs'
import { ChatAttachButton } from '../../components/chat/chat-attach-button/chat-attach-button'
import { ChatSendButton } from '../../components/chat/chat-send-button/chat-send-button'
import { ChatMessageInput } from '../../components/chat/chat-message-input/chat-message-input'
import { ChatConsole } from '../../components/chat/chat-console/chat-console'
import { SettingsUserAvatar } from '../../components/settings-user-avatar/settings-user-avatar'
import { DotsMenu } from '../../components/dots-menu/dots-menu'
import { Routes } from '../../enums/routes.enum'
import { ChatContentHeader } from '../../components/chat/chat-content-header/chat-content-header'
import { ChatMessages } from '../../components/chat/chat-messages/chat-messages'
import { ChatContent } from '../../components/chat/chat-content/chat-content'
import { withChats } from '../../utils/Store'


/*const chatAttachButton = new ChatAttachButton({
	src: '../img/scrap.svg'
})

const chatSendButton = new ChatSendButton({
	label: 'Отправить'
})

const chatMessageInput = new ChatMessageInput({
	validationType: 'default',
	placeholder: 'Введите новое сообщение',
	name: 'message'
})

const chatConsole = new ChatConsole({
	chatAttachButton,
	chatSendButton,
	chatMessageInput
})

const avatar = new SettingsUserAvatar({
	name: 'avatar',
	disabled: true,
	src: '../img/avatar.png',
	accept: 'image/!*'
})

const dotsMenu = new DotsMenu({
	href: Routes.Settings
})

const chatContentHeader = new ChatContentHeader({
	avatar,
	dotsMenu
})

const chatMessages = new ChatMessages({})

const chatContent = new ChatContent({
	chatConsole,
	chatContentHeader,
	chatMessages
})*/

type ChatLayoutProps = {
	chatSidebar: Block;
	currentChatId?: number;
}

 class ChatLayoutWithoutChats extends Block<ChatLayoutProps> {
	constructor(props: ChatLayoutProps) {
		super('div', props)
		this.element!.classList.add('chat-layout')
	}

	init() {
		Object.values(this.children).forEach((child) => {
			child.dispatchComponentDidMount()
		})
	}

	render() {
		console.log('this.props.currentChatId', this.props.currentChatId)

		if (this.props.currentChatId) {
			this.element!.classList.add('chat-layout__content')

			const chatAttachButton = new ChatAttachButton({
				src: '../img/scrap.svg'
			})


			const chatSendButton = new ChatSendButton({
				label: 'Отправить'
			})

			const chatMessageInput = new ChatMessageInput({
				validationType: 'default',
				placeholder: 'Введите новое сообщение',
				name: 'message'
			})

			const chatConsole = new ChatConsole({
				chatAttachButton,
				chatSendButton,
				chatMessageInput
			})

			const chatContent = new ChatContent({
				chatId: this.props.currentChatId,
				chatConsole
			});
			console.log('chatContent', chatContent)

			this.children.chatContent = chatContent as Block
		} else {
			this.element!.classList.remove('chats-layout__content')
			delete this.children.chatContent
		}

		return this.compile(template, { ...this.props })
	}


	componentDidMount() {
		Object.values(this.children).forEach((child) => {
			child.dispatchComponentDidMount()
		})
	}
}

export const ChatLayout = withChats(ChatLayoutWithoutChats as unknown as typeof Block);
