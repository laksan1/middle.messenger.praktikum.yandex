import { SearchInput } from '../../components/search-input/search-input';
import { ChatSidebar } from '../../components/chat/chat-sidebar/chat-sidebar';
import { ChatLayout } from '../../layouts/chat/chat-layout';
import { Routes } from '../../enums/routes.enum';
import { ChatNewChatButton } from '../../components/chat/chat-new-chat/chat-new-chat-button';
import { SettingsActionLink } from '../../components/settings-action-link/settings-action-link';

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
