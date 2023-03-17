import  Validator, {ValidatorTypes} from '../../utils/Validator';
import Block from '../../utils/Block';
import template from './input.hbs';

type types = 'text' | 'email' | 'password' | 'tel';

type InputProps = {
	label: string;
	name: string;
	type: types;
	placeholder: string;
	value?: string;
	disabled?: boolean;
	error?: string;
	validationType: ValidatorTypes;
	events?: Record<string, (e?: Event) => void>;
}

export class Input extends Block<InputProps> {
	constructor(props: InputProps) {
		super('label', props);
		this.setProps({
			events: {
				...this.props.events,
				focusin: this.validate.bind(this)
			}
		});
	}

	validate() {
		const inputField = this.element!.querySelector('.initial-input__input');
		if (!inputField) return;

		inputField.addEventListener('blur', (e) => {
			const target = e.target as HTMLInputElement;
			const validator = new Validator(target, this.props.validationType);

			validator.check();
			this.setProps({error: validator.getError(), value: target!.value});

		}, {once: true});
	}

	getName() {
		return this.props.name;
	}

	getValue() {
		return this.props.value;
	}

	setError(errorMessage: string) {
		this.setProps({ error: errorMessage });
	}


	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

}

