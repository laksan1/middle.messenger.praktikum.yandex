import { Button } from '../../components/button/button';
import Block from '../../utils/Block';
import { closeModalWindow } from '../../utils/ModalWindow';
import ChatsController from '../../controllers/ChatsController';
import template from './chat-delete-chat-block.hbs';
import { withChats } from '../../utils/Store'

interface ChatDeleteChatBlockProps {
	currentChatId: number;
	submitButton: Button;
	cancelButton: Button;
}

class ChatDeleteChatBlockBase extends Block<ChatDeleteChatBlockProps> {

	constructor(props: ChatDeleteChatBlockProps) {
		super('section', props);

		this.children.submitButton.setProps({
			events: {
				click: this.delete.bind(this)
			}
		});

		this.children.cancelButton.setProps({
			events: {
				click: closeModalWindow
			}
		})
	}

	async delete() {
		console.log('ChatDeleteChatBlockBase this.props.currentChatId',this.props.currentChatId)
		await ChatsController.delete(this.props.currentChatId);
		closeModalWindow();
	}

	render() {
		return this.compile(template, { ...this.props });
	}

}

export const ChatDeleteChatBlock = withChats(ChatDeleteChatBlockBase as unknown as typeof Block);
