import { expect } from 'chai';
import sinon from 'sinon';
import EventBus from './EventBus';
import Block from './Block';
import { beforeEach } from 'mocha';

describe('Block', () => {
	const sandbox = sinon.createSandbox();
	const eventBusSpy = sandbox.spy(EventBus.prototype);

	class ComponentMock extends Block<any> {
		constructor(props?: any) {
			super('div', props);
		}

		getProps() {
			return this.props;
		}
	}

	beforeEach(() => {
		sandbox.resetHistory();
	});

	it('should  init event on initialization', () => {
		new ComponentMock();
		expect(eventBusSpy.emit.calledWith('init')).to.eq(true);
	});

	it('should  render event on initialization', () => {
		new ComponentMock();
		expect(eventBusSpy.emit.calledWith('flow:render')).to.eq(true);
	});

	it('should set props', () => {
		const component = new ComponentMock({
			a: 1,
		});
		component.setProps({ a: 2 });
		expect(eventBusSpy.emit.calledWith('flow:component-did-update')).to.eq(true);
		expect(component.getProps().a).is.eq(2);
	});
});
