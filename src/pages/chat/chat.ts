import { SearchInput } from '../../components/search-input/search-input'
import { ChatSidebar } from '../../components/chat/chat-sidebar/chat-sidebar'
import { ChatLayout } from '../../layouts/chat/chat-layout'
import { ChatContent } from '../../components/chat/chat-content/chat-content'
import { ChatConsole } from '../../components/chat/chat-console/chat-console'
import { ChatAttachButton } from '../../components/chat/chat-attach-button/chat-attach-button'
import { ChatSendButton } from '../../components/chat/chat-send-button/chat-send-button'
import { ChatMessageInput } from '../../components/chat/chat-message-input/chat-message-input'
import { ChatContentHeader } from '../../components/chat/chat-content-header/chat-content-header'
import { SettingsUserAvatar } from '../../components/settings-user-avatar/settings-user-avatar'
import { DotsMenu } from '../../components/dots-menu/dots-menu'
import { ChatMessages } from '../../components/chat/chat-messages/chat-messages'
import { Routes } from '../../enums/routes.enum'
import { ChatNewChatButton } from '../../components/chat/chat-new-chat/chat-new-chat-button'
import { SettingsActionLink } from '../../components/settings-action-link/settings-action-link'




const searchInput = new SearchInput({
	name: 'chat-search',
	placeholder: 'Поиск'
});

const chatNewChatButton = new ChatNewChatButton({
	label: '+',
})

const settingsLink = new SettingsActionLink({
	label: 'Настройки',
	href: Routes.Settings
})

const chatSidebar = new ChatSidebar({
	settingsLink,
	chatNewChatButton,
	searchInput
})



export default class chatPage extends ChatLayout {
	constructor() {
		super({
			chatSidebar,
		})
	}
}
