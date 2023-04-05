import Block from './Block';
import { isEqualPrimitive } from './helpers';

function render(query: string, block: Block) {
	const root = document.querySelector(query);

	if (root === null) {
		throw new Error(`root not found by selector "${query}"`);
	}

	root.innerHTML = '';
	root.append(block.getContent()!);
	block.dispatchComponentDidMount();

	return root;
}

export interface BlockConstructable<P extends object = any> {
	new (props?: P): Block<P>;
}

class Route {
	private block: Block | null = null;

	constructor(private pathname: string, private readonly BlockClass: BlockConstructable, private readonly query: string) {}

	leave() {
		this.block = null;
	}

	match(pathname: string) {
		return isEqualPrimitive(pathname, this.pathname);
	}

	getPathname() {
		return this.pathname;
	}

	render() {
		if (!this.block) {
			this.block = new this.BlockClass();
			render(this.query, this.block!);
			return;
		}
	}
}

class Router {
	private static __instance: Router;
	private routes: Route[] = [];
	private currentRoute: Route | null = null;
	private history = window.history;
	private notFoundRoute: Route | undefined = undefined;
	private beforeRouterGo: (to: Route, from: Route | null) => boolean | Promise<boolean> = () => true;

	constructor(private readonly rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];

		Router.__instance = this;
	}

	public use(pathname: string, block: BlockConstructable) {
		const route = new Route(pathname, block, this.rootQuery);
		this.routes.push(route);
		return this;
	}

	public setNotFound(pathname: string, block: BlockConstructable) {
		this.notFoundRoute = new Route(pathname, block, this.rootQuery);
		return this;
	}

	public start() {
		window.onpopstate = (event: PopStateEvent) => {
			const target = event.currentTarget as Window;

			this._onRoute(target.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	onBeforeRouterGo(callback: (to: Route, from: Route | null) => boolean | Promise<boolean>) {
		this.beforeRouterGo = callback;

		return this;
	}

	private _onRoute(pathname: string) {
		const route = this.getRoute(pathname);
		if (!route) {
			if (this.notFoundRoute) {
				this.currentRoute = this.notFoundRoute;
				this.currentRoute.render();
			}
			return;
		}

		const canResolve = this.beforeRouterGo(route, this.currentRoute);

		if (!canResolve) {
			return;
		}

		if (this.currentRoute && this.currentRoute !== route) {
			this.currentRoute.leave();
		}

		this.currentRoute = route;
		route.render();
	}

	public go(pathname: string) {
		this.history.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	public back() {
		this.history.back();
	}

	public forward() {
		this.history.forward();
	}

	private getRoute(pathname: string) {
		return this.routes.find((route) => route.match(pathname));
	}

	public reset() {
		this.routes = [];
		this.currentRoute = null;
	}
}

export default new Router('#app');
