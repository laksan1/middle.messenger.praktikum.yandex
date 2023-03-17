import {Input} from '../../components/input/input';
import {Button} from '../../components/button/button';
import {ModalWindowLayout} from '../../layouts/modal-window/modal-window-layout';
import {closeModalWindow} from '../../utils/ModalWindow';
import { ChatAddNewChatBlock } from '../../blocks/chat-add-new-chat-block/chat-add-new-chat-block'


const titleInput = new Input({
	type: 'text',
	label: 'Имя',
	placeholder: 'Введите имя нового чата',
	name: 'title',
	validationType: 'default',
});

const submitButton  = new Button ({
	label: 'Добавить',
	type: 'submit',
});

const cancelButton = new Button ({
	label: 'Отмена',
	events: {
		click: () => closeModalWindow(),
	},
});

const  chatAddNewChatBlock = new ChatAddNewChatBlock({
	titleInput,
	submitButton,
	cancelButton,
})

const ChatAddNewChatModal = new ModalWindowLayout({
	modal: chatAddNewChatBlock
})
export default ChatAddNewChatModal;
