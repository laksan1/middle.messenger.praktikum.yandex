import { Button } from '../../components/button/button';
import Block from '../../utils/Block';
import template from './chat-add-new-chat-block.hbs';
import checkForm from '../../utils/FormActions';
import ChatsController from '../../controllers/ChatsController';
import { Input } from '../../components/input/input';
import { closeModalWindow } from '../../utils/ModalWindow';

type ChatAddNewChatBlockProps = {
	titleInput: Input;
	submitButton: Button;
	cancelButton: Button;
	events?: Record<string, (e?: Event) => void>;
};

export class ChatAddNewChatBlock extends Block<ChatAddNewChatBlockProps> {
	constructor(props: ChatAddNewChatBlockProps) {
		super('form', props);
		this.element!.addEventListener('submit', this.sendForm.bind(this));
	}

	async sendForm(e: Event) {
		e.preventDefault();

		const isFormReady = checkForm(e);
		if (isFormReady) {
			const response = await ChatsController.create((this.children.titleInput as Input).getValue()!);

			if (response?.reason) {
				(this.children.titleInput as Input).setError(response.reason);
			} else {
				closeModalWindow();
			}
		}
	}

	protected render() {
		return this.compile(template, { ...this.props });
	}
}
