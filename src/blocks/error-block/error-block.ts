import Block from '../../utils/Block';
import template from './error-block.hbs';
import { NotificationLayoutLink } from '../../components/notification-layout-link/notification-layout-link';

type ErrorBlockProps = {
	label: string;
	description: string;
	link?: NotificationLayoutLink;
};

export class ErrorBlock extends Block<ErrorBlockProps> {
	constructor(props: ErrorBlockProps) {
		super('div', props);
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}
