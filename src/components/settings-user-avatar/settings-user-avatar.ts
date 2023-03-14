import template from './settings-user-avatar.hbs';
import Block from '../../utils/Block';

type SettingsUserAvatarProps = {
	name: string;
	label: string;
	src: string;
	accept: string;
	disabled?: boolean;
};

export class SettingsUserAvatar extends Block<SettingsUserAvatarProps> {
	constructor(props: SettingsUserAvatarProps) {
		super('div', props);
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
