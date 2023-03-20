import Block from '../../utils/Block';
import template from './settings-layout.hbs';
import * as styles from './settings-layout.module.scss';
import { SettingsSideBar } from '../../components/settings-sidebar/settings-sidebar';

type SettingsLayoutProps = {
	component: Block;
	sidebar: SettingsSideBar;
};

export class SettingsLayout extends Block<SettingsLayoutProps> {
	constructor(props: SettingsLayoutProps) {
		super('div', props);
		this.element!.classList.add('settings-container');
	}

	protected render(): DocumentFragment {
		return super.compile(template, { ...this.props, styles });
	}
}
