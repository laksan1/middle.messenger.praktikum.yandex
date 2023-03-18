import Block from '../../../utils/Block'
import template from './chat-console.hbs'
import { ChatAttachButton } from '../chat-attach-button/chat-attach-button'
import { ChatMessageInput } from '../chat-message-input/chat-message-input'
import { ChatSendButton } from '../chat-send-button/chat-send-button'
import checkForm from '../../../utils/FormActions'
import MessagesController from '../../../controllers/MessagesController'
import  { withChats } from '../../../utils/Store'

export interface ChatConsoleProps {
	chatAttachButton: ChatAttachButton;
	chatMessageInput: ChatMessageInput;
	chatSendButton: ChatSendButton;
	currentChatId: number;
	events?: Record<string, (e?: Event) => void>;
}

export class ChatConsoleWithoutChat extends Block<ChatConsoleProps> {
	constructor(props: ChatConsoleProps) {
		super('form', props)
		this.element!.classList.add('chat-console')
		this.element!.addEventListener('submit', this.sendForm.bind(this))
	}

	async sendForm(e: Event) {
		e.preventDefault()
		const isFormReady = checkForm(e)

		if (isFormReady) {
			const message = (this.children.chatMessageInput as ChatMessageInput).getValue()
			console.log('this.props.currentChatId', this.props.currentChatId)

			if (!message) {
				return
			} else {
				console.log('this.props.input', message)
				await MessagesController.sendMessage(this.props.currentChatId, message);
				(this.element as HTMLFormElement)!.reset()
			}
		}
	}

	protected render(): DocumentFragment {
		return this.compile(template, { ...this.props })
	}
}

export const ChatConsole = withChats(ChatConsoleWithoutChat as unknown as typeof Block)
