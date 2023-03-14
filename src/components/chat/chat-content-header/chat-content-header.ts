import Block from '../../../utils/Block';
import template from './chat-content-header.hbs';
import {SettingsUserAvatar} from '../../settings-user-avatar/settings-user-avatar';
import {DotsMenu} from '../../dots-menu/dots-menu';

type ChatContentHeaderProps = {
	avatar: SettingsUserAvatar;
	dotsMenu: DotsMenu;
}
export class ChatContentHeader extends Block<ChatContentHeaderProps> {
	constructor(props: ChatContentHeaderProps) {
		super('section', props);
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
