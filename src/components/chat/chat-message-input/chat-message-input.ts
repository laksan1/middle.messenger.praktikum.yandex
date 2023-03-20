import Block from '../../../utils/Block';
import template from './chat-message-input.hbs';
import { ValidatorTypes } from '../../../utils/Validator';

type ChatMessageInputProps = {
	placeholder: string;
	name: string;
	error?: string;
	value?: string;
	validationType: ValidatorTypes;
	events?: Record<string, (e?: Event) => void>;
};
export class ChatMessageInput extends Block<ChatMessageInputProps> {
	constructor(props: ChatMessageInputProps) {
		super('input', props);
		this.element!.classList.add('chat-message-input');
		this.setProps({
			events: {
				...this.props.events,
				blur: this.set.bind(this),
			},
		});
	}

	async set() {
		this.element!.addEventListener('blur', (e) => {
			const target = e.target as HTMLInputElement;
			this.setProps({ value: target.value });
		});
	}

	getValue() {
		return this.props?.value;
	}

	protected render(): DocumentFragment {
		this.element!.setAttribute('placeholder', this.props.placeholder);
		this.element!.setAttribute('name', this.props.name);
		this.element!.setAttribute('type', 'text');
		return this.compile(template, { ...this.props });
	}
}
