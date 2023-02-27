import {SearchInput} from "../../components/search-input/search-input";
import {ChatSidebar} from "../../components/chat/chat-sidebar/chat-sidebar";
import {ChatLayout} from "../../layouts/chat/chat-layout";
import {ChatContent} from "../../components/chat/chat-content/chat-content";
import {ChatConsole} from "../../components/chat/chat-console/chat-console";
import {ChatAttachButton} from "../../components/chat/chat-attach-button/chat-attach-button";
import {ChatSendButton} from "../../components/chat/chat-send-button/chat-send-button";
import {ChatMessageInput} from "../../components/chat/chat-message-input/chat-message-input";
import {ChatContentHeader} from "../../components/chat/chat-content-header/chat-content-header";
import {SettingsUserAvatar} from "../../components/settings-user-avatar/settings-user-avatar";
import {DotsMenu} from "../../components/dots-menu/dots-menu";
import {ChatMessages} from "../../components/chat/chat-messages/chat-messages";

const chatsData = [
	{
		id: 1,
		user: {
			id: 11,
			displayName: 'Рустам',
			avatar: '../../img/avatar.png',
		},
		unreadMessages: 25,
		lastMessage: {
			value: 'Как дела?',
			date: '2022-12-04T11:10:34.368Z',
			createdDate: '15:10',
			senderId: 34,
		},
	},
	{
		id: 2,
		user: {
			id: 22,
			displayName: 'Александр',
			avatar: '../../img/avatar.png',
		},
		unreadMessages: 0,
		lastMessage: {
			value: 'Все отлчино.',
			date: '2022-12-04T04:10:34.368Z',
			createdDate: '09:10',
			senderId: 12,
		},
	},
	{
		id: 3,
		user: {
			id: 33,
			displayName: 'Илон Маск',
			avatar: '../../img/elon.png',
		},
		unreadMessages: 10,
		lastMessage: {
			value: 'Запускаем',
			date: '2022-12-04T04:10:34.368Z',
			createdDate: '09:10',
			senderId: 2,
		},
	},
	{
		id: 4,
		user: {
			id: 44,
			displayName: 'Jeff bezos',
			avatar: '../../img/bezos.png',
		},
		unreadMessages: 10,
		lastMessage: {
			value: 'Покупаем',
			date: '2022-12-04T04:10:34.368Z',
			createdDate: '09:10',
			senderId: 2,
		},
	},
];

const searchInput = new SearchInput({
	name: 'chat-search',
	placeholder: 'Поиск',
});

const chatSidebar = new ChatSidebar({
	chatsData,
	searchInput,
});

const chatAttachButton = new ChatAttachButton({
	src: '../img/scrap.svg'
});

const chatSendButton = new ChatSendButton({
	label: 'Отправить'
});

const chatMessageInput = new ChatMessageInput({
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
	label: 'Поменять аватар',
	accept: 'image/*',

});

const dotsMenu = new DotsMenu({
	href: '#'
})

const chatContentHeader = new ChatContentHeader({
	avatar,
	dotsMenu,
})

const chatMessages = new ChatMessages({});

const chatContent = new ChatContent({
	chatConsole,
	chatContentHeader,
	chatMessages
})

const  chatPage = new ChatLayout({
	chatSidebar,
	chatContent

})
export default chatPage;
