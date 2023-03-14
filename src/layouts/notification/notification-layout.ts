import Block from '../../utils/Block';
import template from './notification-layout.hbs';
import * as styles from './notification-layout.module.scss';
import {ErrorBlock} from '../../blocks/error-block/error-block';

type NotificationLayoutProps = {
	component: ErrorBlock;
}

export class NotificationLayout extends Block<NotificationLayoutProps> {
	constructor(props: NotificationLayoutProps) {
		super('article', props);
		this.element?.classList.add(styles.notification__container);
	}

	protected render(): DocumentFragment {
		return super.compile(template, {...this.props, styles});
	}
}
