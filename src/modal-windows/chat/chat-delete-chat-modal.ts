import { Button } from '../../components/button/button'
import { closeModalWindow } from '../../utils/ModalWindow'
import { ModalWindowLayout } from '../../layouts/modal-window/modal-window-layout'
import { ChatDeleteChatBlock } from '../../blocks/chat-delete-chat-block/chat-delete-chat-block'


const submitButton  = new Button ({
	label: 'Удалить',
	type: 'submit',
});

const cancelButton = new Button ({
	label: 'Отмена',
	events: {
		click: () => closeModalWindow(),
	},
});

const chatDeleteChatBlock = new ChatDeleteChatBlock({
	submitButton,
	cancelButton,
})

const ChatDeleteChatModal = new ModalWindowLayout({
	modal: chatDeleteChatBlock
})
export default ChatDeleteChatModal;
