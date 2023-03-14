import Block from '../../../utils/Block';
import template from './chat-attach-button.hbs';

type ChatAttachButtonProps = {
	src: string;
	events?: Record<string, (e?: Event) => void>;
}
export class ChatAttachButton extends Block<ChatAttachButtonProps> {
	constructor(props: ChatAttachButtonProps) {
		super('button', props);
		this.element!.classList.add('attach-button');
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
