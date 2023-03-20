import Block from '../utils/Block';
import Router from '../utils/Router';

export interface PropsWithRouter {
	router: typeof Router;
}

export function withRouter(Component: typeof Block<any>) {
	type Props = typeof Component extends typeof Block<infer P extends object> ? P : any;

	return class WithRouter extends Component {
		constructor(props: Props & PropsWithRouter) {
			super({ ...props, router: Router });
		}
	};
}
