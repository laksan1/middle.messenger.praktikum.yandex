import template from './chat-sidebar.hbs'
import { SearchInput } from '../../search-input/search-input'
import Block from '../../../utils/Block'
import { ChatNewChatButton } from '../chat-new-chat/chat-new-chat-button'
import { withChats } from '../../../utils/Store'
import { Chat, LastMessage } from '../../../interfaces/chat/chat.interface'
import ChatsController from '../../../controllers/ChatsController'
import { SettingsActionLink } from '../../settings-action-link/settings-action-link'
import { openModalWindow } from '../../../utils/ModalWindow'
import ChatAddNewChatModal from '../../../modal-windows/chat/chat-add-new-chat-modal'

type ChatSidebarProps = {
	chats: Chat[];
	settingsLink: SettingsActionLink;
	chatNewChatButton: ChatNewChatButton;
	isSearching: boolean;
	currentChatId?: number;
	searchInput: SearchInput;
	events: Record<string, (e?: Event) => void>;
}

interface ChatListItem extends Chat {
	isActive: boolean;
	lastMessage: LastMessage & Record<'createdDate', string>
}

class ChatSidebarWithoutChats extends Block<ChatSidebarProps> {

	chatsItems: ChatListItem[] = []

	searchCounter: NodeJS.Timeout | number = 0

	constructor(props: ChatSidebarProps) {
		super('section', props)
		this.setProps({
			events: {
				...this.props.events,
				click: this.click.bind(this),
			}
		});

		this.children.searchInput.setProps({
			events: {
				input: this.findUsers.bind(this),
			}
		})
	}

	click(e: Event) {
		if (e.target instanceof HTMLElement) {
			if (e.target.classList.contains('chat-sidebar-item_empty') || e.target.closest('.chat-sidebar-item_empty')) {
				openModalWindow(ChatAddNewChatModal)
			}
			const hasChatId = e.target.hasAttribute('data-chat-id');
			if (hasChatId) {
				ChatsController.selectChat(Number(e.target.getAttribute('data-chat-id')));
			} else if (e.target.closest('.chat-sidebar-item')?.hasAttribute('data-chat-id')) {
				ChatsController.selectChat(Number(e.target.closest('.chat-sidebar-item')?.getAttribute('data-chat-id')));
			}
		}
	}


	selectChat(id: number) {
		ChatsController.selectChat(id)
	}

	componentDidMount() {
		this.updateChatsList()
	}

	async findUsers(e: Event) {
		e.preventDefault()
		if (e.target instanceof HTMLInputElement) {
			const target = e.target
			console.log('target', target)
			clearTimeout(this.searchCounter)
			this.searchCounter = setTimeout(async () => {
				if (target.value) {
					await ChatsController.loadChats(target.value)
					this.setProps({ isSearching: true })
				} else {
					await ChatsController.loadChats()
					this.setProps({ isSearching: false })
				}
			}, 600)
		}
	}

	updateChatsList() {
		ChatsController.loadChats();
	}

	protected render(): DocumentFragment {
		this.chatsItems = this.props.chats.map((chat) => {
			const newChatData = { ...chat } as ChatListItem

			newChatData.isActive = this.props.currentChatId === chat.id

			if (chat.last_message) {
				const hour = String(new Date(chat.last_message.time).getHours()).padStart(2, '0'),
					minutes = String(new Date(chat.last_message.time).getMinutes()).padStart(2, '0')
				newChatData.last_message.time = `${hour}:${minutes}`
			}

			return newChatData as ChatListItem
		})

		return this.compile(template, { ...this.props, chatsItems: this.chatsItems })
	}
}

export const ChatSidebar = withChats(ChatSidebarWithoutChats as unknown as typeof Block)
