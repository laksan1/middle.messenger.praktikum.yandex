import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';
import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import { afterEach } from 'mocha';

describe('HTTPTransport', () => {
	const requests: SinonFakeXMLHttpRequest[] = [];
	const originalXHR = global.XMLHttpRequest;
	let transport: HTTPTransport;
	beforeEach(() => {
		transport = new HTTPTransport('/');
		const XHR = sinon.useFakeXMLHttpRequest();
		// @ts-ignore
		global.XMLHttpRequest = XHR;
		XHR.onCreate = function (xhr: SinonFakeXMLHttpRequest) {
			requests.push(xhr);
		};
	});

	afterEach(() => {
		requests.length = 0;
	});

	after(() => {
		global.XMLHttpRequest = originalXHR;
	});

	it('should make GET request', () => {
		transport.get();
		const request = requests[0];
		expect(request.method).to.eq('Get');
	});

	it('should make PUT request', () => {
		transport.put('test', {});
		const request = requests[0];
		expect(request.method).to.eq('Put');
	});

	it('should make POST request', () => {
		transport.post('test');
		const request = requests[0];
		expect(request.method).to.eq('Post');
	});

	it('should make DELETE request', () => {
		transport.delete('test');
		const request = requests[0];
		expect(request.method).to.eq('Delete');
	});

	it('should check default timeout', () => {
		transport.get('/');
		const [request] = requests;
		expect((request as any).timeout).to.eq(5000);
	});

	it('should set Data for request', () => {
		const data = {
			name: 'Ivan',
			lastName: 'Ivanov',
			isAdmin: false,
		};
		transport.post('/user', data);
		const [request] = requests;
		expect(request.requestBody).to.eq(JSON.stringify(data));
	});
});
