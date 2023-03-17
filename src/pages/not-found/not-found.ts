import {NotificationLayout} from '../../layouts/notification/notification-layout';
import {NotificationLayoutLink} from '../../components/notification-layout-link/notification-layout-link';
import {NotFoundBlock} from '../../blocks/not-found-block/not-found-block';

const link = new NotificationLayoutLink({
	label: 'Назад к чатам',
	href: '#',
})
const notFoundBlock = new NotFoundBlock({
	label:  '404',
	description: 'Не туда попали',
	link
})

export default class notFoundPage extends NotificationLayout {
	constructor() {
		super({
			component: notFoundBlock,
		});
	}
}


