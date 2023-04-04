import { expect } from 'chai';
import sinon from 'sinon';
import { after, beforeEach } from 'mocha';
import Router, { BlockConstructable } from './Router';

describe('Router', () => {
	const sandbox = sinon.createSandbox();
	const originalBack = global.window.history.back;
	const originalForward = global.window.history.forward;

	before(() => {
		global.window.history.back = () => {
			if (typeof window.onpopstate === 'function') {
				// window.location.pathname = '/';
				window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
			}
		};

		global.window.history.forward = () => {
			if (typeof window.onpopstate === 'function') {
				window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
			}
		};
	});

	beforeEach(() => {
		Router.reset();
		contentFake.callCount = 0;
	});

	after(() => {
		global.window.history.back = originalBack;
		global.window.history.forward = originalForward;
	});

	const contentFake = sandbox.fake.returns(document.createElement('div'));
	const BlockMock = class {
		getContent = contentFake;
		dispatchComponentDidMount = () => {};
	} as unknown as BlockConstructable;

	it('use() should return Router instance', () => {
		const result = Router.use('/', BlockMock);
		expect(result).to.eq(Router);
	});

	it('should render home page', () => {
		Router.use('/', BlockMock);
		Router.start();
		expect(contentFake.callCount).to.eq(1);
	});

	it('should not render protected page', () => {
		const banRoute = '/guard';
		Router.use('/', BlockMock)
			.use(banRoute, BlockMock)
			.onBeforeRouterGo((to) => {
				return to.getPathname() !== banRoute;
			})
			.start();
		Router.go(banRoute);
		expect(contentFake.calledOnce).to.eq(true);
	});

	it('should set a not found route', () => {
		const notFoundRoutePath = '/404';
		Router.setNotFound(notFoundRoutePath, BlockMock).start();
		const notFoundRoute = Router['notFoundRoute'];
		expect(notFoundRoute?.getPathname()).to.equal('/404');
	});

	it('should render home page on history back', () => {
		const contentFake = sandbox.fake.returns(document.createElement('ul'));

		const BlockMock = class {
			getContent = contentFake;
			dispatchComponentDidMount = () => {};
		} as unknown as BlockConstructable;

		Router.use('/', BlockMock);
		Router.use('/404', BlockMock);
		Router.use('/500', BlockMock);
		Router.start();

		Router.go('/500');
		Router.go('/404');
		//window.location.pathname = '/';
		Router.back();
		expect(contentFake.callCount).to.eq(2);
	});

	it('should render home page on history forward', () => {
		Router.start();
		Router.use('/', BlockMock);
		Router.start();
		Router.back();
		Router.forward();
		expect(contentFake.callCount).to.eq(1);
	});

	it('beforeRouterGo()', () => {
		const result = Router.use('/', BlockMock).onBeforeRouterGo(() => true);
		expect(result).to.eq(Router);
	});
});
