import Block from '../../../utils/Block'
import template from '../../notification-layout-link/notification-layout-link.hbs'
import { openModalWindow } from '../../../utils/ModalWindow'
import ChatsController from '../../../controllers/ChatsController'
import ChatAddNewChatModal from '../../../modal-windows/chat/chat-add-new-chat-modal'

type ChatNewChatButtonProps = {
	label: string;
	events?: Record<string, (e?: Event) => void>;
}

export class ChatNewChatButton extends Block<ChatNewChatButtonProps> {
	constructor(props: ChatNewChatButtonProps) {
		super('a', props)
		this.element!.classList.add('chat-new-chat')
		this.element?.addEventListener('click', this.addChat.bind(this))
	}

	addChat(e: Event) {
		e.preventDefault()
		if (e.target instanceof HTMLElement) {
			if (e.target.classList.contains('chat-new-chat') || e.target.closest('.chat-new-chat')) {
				openModalWindow(ChatAddNewChatModal)
			}

			if (e.target.hasAttribute('data-chat-id')) {

				ChatsController.selectChat(Number(e.target.getAttribute('data-chat-id')))
			} else if (e.target.closest('.chats-item')?.hasAttribute('data-chat-id')) {
				ChatsController.selectChat(Number(e.target.closest('.chats-item')?.getAttribute('data-chat-id')))
			}
		}

	}

	protected render(): DocumentFragment {
		return this.compile(template, { ...this.props })
	}
}
