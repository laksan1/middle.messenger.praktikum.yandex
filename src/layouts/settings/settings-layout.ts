import Block from '../../utils/Block';
import template from './settings-layout.hbs';
import styles from './settings-layout.module.scss';
import {SettingsSideBar} from "../../components/settings-sidebar/settings-sidebar";
import {SettingsBlock} from "../../components/settings-block/settings-block";
import {SettingsChangePasswordBlock} from "../../components/settings-change-password-block/settings-change-password-block";

type SettingsLayoutProps = {
	component: SettingsBlock | SettingsChangePasswordBlock;
	sidebar:  SettingsSideBar
}

export class SettingsLayout extends Block<SettingsLayoutProps> {
	constructor(props: SettingsLayoutProps) {
		super('div', props);
	}

	protected render(): DocumentFragment {
		return super.compile(template, {...this.props, styles});
	}
}
