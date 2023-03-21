import { Button } from '../../components/button/button';
import { closeModalWindow } from '../../utils/ModalWindow';
import { ModalWindowLayout } from '../../layouts/modal-window/modal-window-layout';
import { SearchInput } from '../../components/search-input/search-input';
import { ChatShowUsersBlock } from '../../blocks/chat-show-users-block/chat-show-users-block';

const searchInput = new SearchInput({
	name: 'users-search',
	placeholder: 'Введите имя пользователя',
});

const cancelButton = new Button({
	label: 'Закрыть',
	events: {
		click: () => closeModalWindow(),
	},
});

const chatShowUsersBlock = new ChatShowUsersBlock({
	searchInput,
	cancelButton,
	currentChatMembers: [],
	users: [],
});

const ChatShowUsersModal = new ModalWindowLayout({
	modal: chatShowUsersBlock,
});
export default ChatShowUsersModal;
