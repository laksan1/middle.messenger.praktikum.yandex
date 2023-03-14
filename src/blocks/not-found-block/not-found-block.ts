import Block from '../../utils/Block';
import template from './not-found-block.hbs';
import {NotificationLayoutLink} from '../../components/notification-layout-link/notification-layout-link';

type NotFoundBlockProps = {
	label: string;
	description: string;
	link?: NotificationLayoutLink;
}

export class NotFoundBlock extends Block<NotFoundBlockProps> {
	constructor(props: NotFoundBlockProps) {
		super('div', props);
	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
