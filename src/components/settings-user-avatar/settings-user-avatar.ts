import template from './settings-user-avatar.hbs';
import Block from '../../utils/Block';

type SettingsUserAvatarProps = {
	name: string;
	src?: string;
	file?: File;
	imageAlt?: string;
	accept: string;
	disabled?: boolean;
	events?: Record<string, (e?: Event) => void>;
};

export class SettingsUserAvatar extends Block<SettingsUserAvatarProps> {
	constructor(props: SettingsUserAvatarProps) {
		super('div', props);
		this.setProps({
			events: {
				...this.props.events,
				change: this.setValue.bind(this)
			}
		});
	}
	getName() {
		return this.props.name;
	}

	getValue() {
		return this.props.file;
	}

	render() {
		return this.compile(template, { ...this.props })
	}

	setValue(e: Event) {
		if (e.target instanceof HTMLInputElement) {
			const target = e.target as HTMLInputElement;

			if (target.files && target.files.length) {
				this.setProps({ file: target.files[0], src: URL.createObjectURL(target.files[0])})
			}
		}
	}
}
