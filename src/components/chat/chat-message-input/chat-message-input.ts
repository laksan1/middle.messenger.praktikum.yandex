import Block from '../../../utils/Block';
import template from './chat-message-input.hbs';
import Validator, { ValidatorTypes } from '../../../utils/Validator'

type ChatMessageInputProps = {
	placeholder: string;
	name: string;
	error?: string;
	value?: string;
	validationType: ValidatorTypes;
	events?: Record<string, (e?: Event) => void>;
}
export class ChatMessageInput extends Block<ChatMessageInputProps> {
	constructor(props: ChatMessageInputProps) {
		super('label', props);
		this.element!.classList.add('chat-message-input');
		this.setProps({
			events: {
				...this.props.events,
				change: this.set.bind(this)
			}
		});
	}

	set() {
		const inputField = this.element!.querySelector('.chat-message-input');
		if (!inputField) return;
		inputField.addEventListener('change', (e) => {
			const target = e.target as HTMLInputElement;

			const validator = new Validator(target, this.props.validationType);
			validator.check();
			this.setProps({error: validator.getError(), value: target!.value});

		}, {once: true});
	}


	getValue() {
		return this.props?.value;
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

}
