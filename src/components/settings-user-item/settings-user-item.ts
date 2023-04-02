import Block from '../../utils/Block';
import template from './settings-user-item.hbs';

type SettingsUserItemProps = {
	label: string;
	value: string;
};

export class SettingsUserItem extends Block<SettingsUserItemProps> {
	constructor(props: SettingsUserItemProps) {
		super('div', props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
