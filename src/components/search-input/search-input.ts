import template from './search-input.hbs';
import Block from '../../utils/Block';

type SearchInputProps = {
	name: string;
	placeholder: string;
	disabled?: boolean;
	value?: string;
	events?: Record<string, (e?: Event) => void>;
};

export class SearchInput extends Block<SearchInputProps> {
	constructor(props: SearchInputProps) {
		super('label', props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
