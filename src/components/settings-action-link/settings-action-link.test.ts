import { SettingsActionLinkBase as Link } from './settings-action-link';
import Router from '../../utils/Router';
import { expect } from 'chai';
import sinon from 'sinon';

describe('SettingsActionLinkBase', () => {
	const label = 'Home page';
	const href = '/';
	const callback = sinon.stub();
	const router = { go: callback } as unknown as typeof Router;

	beforeEach(() => {
		callback.reset();
	});

	it('should render', () => {
		new Link({ href: '/', label, router });
	});

	it('should render passed label', () => {
		const link = new Link({ href: '/', label, router: {} as typeof Router });
		expect(link.element?.textContent).to.include(label);
	});

	it('should call Router.go with passed route on click', () => {
		sinon.spy(Router, 'go');
		// @ts-ignore
		const link = new Link({ href, label, router });
		link.element?.click();
		expect(callback.calledWith(href)).to.eq(true);
	});
});
